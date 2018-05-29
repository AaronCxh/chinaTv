DateInput = (function($) {

	function DateInput(el, opts) {
if (typeof(opts) != "object") opts = {};
		$.extend(this, DateInput.DEFAULT_OPTS, opts);
		this.input = $(el);
		this.bindMethodsToObj("_show", "_hide", "hideIfClickOutside", "keydownHandler", "selectDate");
		this.build();
		//选择日期
		this.selectDate();
		if(this.show){
			this._show();
		}else{
			this._hide();
		}
	};
	DateInput.DEFAULT_OPTS = {
		month_names_en: ["一月份", "二月份", "三月份", "四月份", "五月份", "六月份", "七月份", "八月份", "九月份", "十月份", "十一月份", "十二月份"],
		month_names: ["1","2","3","4","5","6","7","8","9","10","11","12"],
		short_month_names: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		short_day_names: ["日", "一", "二", "三", "四", "五", "六"],
		start_of_week: 0
	};

	

	DateInput.prototype = {
		build: function() {

			//月份导航
			var monthNav = $('<p class="month_nav">' + 
				'<span class="button prev" title="[Page-Up]">&#171;</span>' + 
				' <span class="month_name">初始化的月份</span> ' + '<span class="button next disabled" title="[Page-Down]">&#187;</span>' + 
				'</p>');
			//获取月份名称
			this.monthNameSpan = $(".month_name", monthNav);
			//绑定事件
			$(".prev", monthNav).click(this.bindToObj(function() {
				this.moveMonthBy( - 1)
				// if(new Date().getMonth() + 1>= $(".month_name", monthNav).attr("data-month")){
				// 	$(".next.disabled", monthNav).removeClass("disabled")
				// }
			}));
			//绑定事件
			$(".next", monthNav).click(this.bindToObj(function() {
				this.moveMonthBy(1)
				console.log(new Date().getMonth() + 1 , $(".month_name", monthNav).attr("data-month"));
				// if(new Date().getMonth() + 1 <= $(".month_name", monthNav).attr("data-month")){
				// 	$(".next", monthNav).addClass("disabled");
				// }
			}));

			//获取月份名称

			var yearNav = $('<p class="year_nav">' + '<span class="button prev" title="[Ctrl+Page-Up]">&#171;</span>' + ' <span class="year_name"></span> ' + '<span class="button next disabled" title="[Ctrl+Page-Down]">&#187;</span>' + '</p>');
			this.yearNameSpan = $(".year_name", yearNav);
			$(".prev", yearNav).click(this.bindToObj(function() {
				this.moveMonthBy( - 12)		
				// if(new Date().getFullYear() >= $(".year_name", yearNav).text()){
				// 	$(".next.disabled", yearNav).removeClass("disabled")
				// }
			}));
			$(".next", yearNav).click(this.bindToObj(function() {
				this.moveMonthBy(12)
				// if(new Date().getFullYear() <= $(".year_name", yearNav).text()){
				// 	$(".next", yearNav).addClass("disabled")
				// }
			}));

			//创建并插入月份和年份
			var nav = $('<div class="table-nav"></div>').append(monthNav, yearNav);

			//初始化日历
			var tableShell = "<table class='date-table'><thead><tr>";
			//[一,二,三...]遍历,初始化表头
			$(this.short_day_names).each(function() {
				tableShell += "<th>" + this + "</th>"
			});
			tableShell += "</tr></thead><tbody></tbody></table>";
			//日历的外层
			if(this.input[0].nodeName === "INPUT"){
				this.dateSelector = this.rootLayers = $('<div class="date_selector"></div>').append(nav, tableShell).insertAfter(this.input);
			}else{
				this.dateSelector = this.rootLayers = $('<div class="date_selector"></div>').append(nav, tableShell);
				this.input.append(this.dateSelector);
			}
			
			//检测,没什么用,在 插入到div中并插入到input后面
			if ('undefined' == typeof(document.body.style.maxHeight)) {
				this.ieframe = $('<iframe class="date_selector_ieframe" frameborder="0" src="#"></iframe>').insertBefore(this.dateSelector);
				this.rootLayers = this.rootLayers.add(this.ieframe);
				$(".button", nav).mouseover(function() {
					$(this).addClass("hover")
				});
				$(".button", nav).mouseout(function() {
					$(this).removeClass("hover")
				})
			};

			//找到body
			this.tbody = $("tbody", this.dateSelector);

			//为文本框绑定事件
			if(this.input[0].nodeName === "INPUT"){
				this.input.change(this.bindToObj(function() {
				this.selectDate()
			}));
			}
			
			this.selectDate();
		},
		//核心函数
		selectMonth: function(date) {
			var newMonth = new Date(date.getFullYear(), date.getMonth(), 1);
			if (!this.currentMonth || !(this.currentMonth.getFullYear() == newMonth.getFullYear() && this.currentMonth.getMonth() == newMonth.getMonth())) {
				this.currentMonth = newMonth;
				//这个月开始日期和结束日期
				var rangeStart = this.rangeStart(date),
				rangeEnd = this.rangeEnd(date);

				//显示天数
				var numDays = this.daysBetween(rangeStart, rangeEnd);
				var dayCells = "";

				// 循环生成日历主体
				for (var i = 0; i <= numDays; i++) {
					//现在的时间
					var currentDay = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate() + i, 12, 00);
					if (this.isFirstDayOfWeek(currentDay)) dayCells += "<tr>";
					// console.log(currentDay.getMonth(),date.getMonth());
					if (currentDay.getMonth() == date.getMonth()) {
						dayCells += '<td class="selectable_day" date="' + this.dateToString(currentDay) + '">' + currentDay.getDate() + '</td>'
					/* 非本个月 */
					} else {
						dayCells += '<td class="unselected_month" date="' + this.dateToString(currentDay) + '">' + currentDay.getDate() + '</td>'
					};
					

					if (this.isLastDayOfWeek(currentDay)) dayCells += "</tr>"
				};

				this.tbody.empty().append(dayCells);
				//
				this.monthNameSpan.empty().append(this.monthName(date)).attr("data-month",date.getMonth() + 1);
				this.yearNameSpan.empty().append(this.currentMonth.getFullYear());

				if(this.input[0].nodeName === "INPUT"){
					$(".selectable_day", this.tbody).click(this.bindToObj(function(event) {
					this.changeInput($(event.target).attr("date"))
				}));
				}
				
				//今天添加today
				$("td[date=" + this.dateToString(new Date()) + "]", this.tbody).addClass("today");
					

				//鼠标移入效果
				$("td.selectable_day", this.tbody).mouseover(function() {
					$(this).addClass("hover")
				});
				$("td.selectable_day", this.tbody).mouseout(function() {
					$(this).removeClass("hover")
				});


				$(".selectable_day").on("click",function(e){
					var searchKey = $(this).attr("date");
					 var nid = jQuery("#nid").val();
         			if (searchKey != "")
             			location = "/Article/InformationSearchSearch.aspx?key=" + encodeURI(searchKey) + "&nid=" + nid;
         			else {
             			alert("没有您想要的数据");
         			}
				})
			};

			$('.selected', this.tbody).removeClass("selected");
			$('td[date=' + this.selectedDateString + ']', this.tbody).addClass("selected")
		},

		selectDate: function(date) {
			//获取当前时间
			if (!date) date = new Date();
			this.selectedDate = date;
			//YYYY-MM-DD
			this.selectedDateString = this.dateToString(this.selectedDate);
			//核心函数
			this.selectMonth(this.selectedDate);
		},
		changeInput: function(dateString) {
			this.input.val(dateString).change();
			this._hide()
		},
		_show: function() {
			this.rootLayers.css("display", "block");
			if(this.input[0].nodeName === "INPUT"){
				$([window, document.body]).click(this.hideIfClickOutside);
			}
			this.input.unbind("focus", this._show);
			$(document.body).keydown(this.keydownHandler);
			// this.setPosition();
		},
		_hide: function() {
			this.rootLayers.css("display", "none");
			if(this.input[0].nodeName === "INPUT"){
				$([window, document.body]).unbind("click", this.hideIfClickOutside);
			}

			this.input.focus(this._show);
			$(document.body).unbind("keydown", this.keydownHandler)
		},
		hideIfClickOutside: function(event) {
			if (event.target != this.input[0] && !this.insideSelector(event)) {
				this._hide()
			}
		},
		insideSelector: function(event) {
			var offset = this.dateSelector.position();
			offset.right = offset.left + this.dateSelector.outerWidth();
			offset.bottom = offset.top + this.dateSelector.outerHeight();
			return event.pageY < offset.bottom && event.pageY > offset.top && event.pageX < offset.right && event.pageX > offset.left
		},
		keydownHandler: function(event) {
			switch (event.keyCode) {
			case 9:
			case 27:
				this._hide();
				return;
				break;
			case 13:
				this.changeInput(this.selectedDateString);
				break;
			case 33:
				this.moveDateMonthBy(event.ctrlKey ? -12 : -1);
				break;
			case 34:
				this.moveDateMonthBy(event.ctrlKey ? 12 : 1);
				break;
			case 38:
				this.moveDateBy( - 7);
				break;
			case 40:
				this.moveDateBy(7);
				break;
			case 37:
				this.moveDateBy( - 1);
				break;
			case 39:
				this.moveDateBy(1);
				break;
			default:
				return
			}
			event.preventDefault()
		},
		//返回YYYY-MM-DD
		dateToString: function(date) {
			return date.getFullYear()+"-"+(this.short_month_names[date.getMonth()] < 10? '0' +this.short_month_names[date.getMonth()] : this.short_month_names[date.getMonth()])+"-" +date.getDate()
		},
		setPosition: function() {
			var offset = this.input.offset();
			this.rootLayers.css({
				top: offset.top + this.input.outerHeight(),
				left: offset.left
			});
			if (this.ieframe) {
				this.ieframe.css({
					width: this.dateSelector.outerWidth(),
					height: this.dateSelector.outerHeight()
				})
			}
		},
		moveDateBy: function(amount) {
			var newDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate() + amount);
			this.selectDate(newDate)
		},
		moveDateMonthBy: function(amount) {
			var newDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + amount, this.selectedDate.getDate());
			if (newDate.getMonth() == this.selectedDate.getMonth() + amount + 1) {
				newDate.setDate(0)
			};
			this.selectDate(newDate)
		},
		moveMonthBy: function(amount) {
			var newMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + amount, this.currentMonth.getDate());
			console.log(newMonth);
			this.selectMonth(newMonth)
		},
		monthName: function(date) {
			return this.month_names_en[date.getMonth()]
		},
		bindToObj: function(fn) {
			var self = this;
			return function() {
				return fn.apply(self, arguments)
			}
		},
		bindMethodsToObj: function() {
			for (var i = 0; i < arguments.length; i++) {
				this[arguments[i]] = this.bindToObj(this[arguments[i]])
			}
		},
		indexFor: function(array, value) {
			for (var i = 0; i < array.length; i++) {
				if (value == array[i]) return i
			}
		},
		monthNum: function(month_name) {
			return this.indexFor(this.month_names, month_name)
		},
		shortMonthNum: function(month_name) {
			return this.indexFor(this.short_month_names, month_name)
		},
		shortDayNum: function(day_name) {
			return this.indexFor(this.short_day_names, day_name)
		},
		daysBetween: function(start, end) {
			start = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
			end = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
			return (end - start) / 86400000
		},
		changeDayTo: function(dayOfWeek, date, direction) {
			var difference = direction * (Math.abs(date.getDay() - dayOfWeek - (direction * 7)) % 7);
			return new Date(date.getFullYear(), date.getMonth(), date.getDate() + difference)
		},
		rangeStart: function(date) {
			return this.changeDayTo(this.start_of_week, new Date(date.getFullYear(), date.getMonth()), -1)
		},
		rangeEnd: function(date) {
			return this.changeDayTo((this.start_of_week - 1) % 7, new Date(date.getFullYear(), date.getMonth() + 1, 0), 1)
		},
		isFirstDayOfWeek: function(date) {
			return date.getDay() == this.start_of_week
		},
		isLastDayOfWeek: function(date) {
			return date.getDay() == (this.start_of_week - 1) % 7
		},
		//调整函数,返回[一,二,三...];
		adjustDays: function(days) {
			var newDays = [];
			for (var i = 0; i < days.length; i++) {
				newDays[i] = days[(i + this.start_of_week) % 7];
				
			};
			return newDays
		}
	};



	options = {
		show:false
		//没有场次

		//订阅场次
	}

	$.fn.date_input = function(opts) {
		opts = $.extend(options,opts)
		return this.each(function() {
			new DateInput(this, opts)
		})
	};
	$.date_input = {
		initialize: function(opts) {
			$("input.date_input").date_input(opts)
		}
	};
	return DateInput
})(jQuery);
