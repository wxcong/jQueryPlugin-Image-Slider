(function($) {

	$.fn.divToSlider = function(options) {

		var defaults = {
			width: 600,
			height: 300,
			frequency: 3000,
			left_spacing: "5px",
			right_spacing: "5px",
			dot_container_background: "rgba(255,255,255,0.3)",
			dot_container_border_radius: "10px",
			dot_container_height: "13px",
			dot_height: "12px",
			dot_width: "12px",
			dot_margin: "2px",
			dot_color: "#B7B7B7",
			dot_selected_color: "#F40",
			dot_container_position: {
				"left": "50%",
				"bottom": "15px"
			},
			button_arrow_position_size: {
				"top": "50%",
			    "width": "40px",
			    "height": "48px"
			}
		}

		if (arguments.length > 0) {
			options = $.extend(defaults, options);
		}else {
			options = defaults;
		}

		$imgs = this.find("img");
		$imgs.css({
			"width": options.width,
			"height": options.height
		})
		this.empty();

		$ppbc = $("<div></div>").attr("id", "pre-pos-btn-con");
		var prev_button = "<img id='pre-btn' src='./img/left.png'/>"
		var post_button = "<img id='pos-btn' src='./img/right.png'/>";
		$.each([prev_button, post_button], function() {
			$ppbc.append(arguments[1]);
		});
		this.append($ppbc);

		$ismc = $("<ul></ul>").attr("id", "img-sld-mov-con");
		$imgs.each(function() {
			$("<li></li>").appendTo($ismc);
			$ismc.children().last().append(this);
		});
		this.append($ismc);

		$dmbc = $("<ul></ul>").attr("id", "dot-mov-btn-con");
		this.append($dmbc);

		//part zero
		var clear_element_spacing = {
			"margin": "0",
			"padding": "0"
		}

		var clear_list_style = {
			"list-style": "none"
		}

		var mould_slider_outline = {
			"width": options.width,
			"height": options.height,
			"position": "relative",
			"overflow": "hidden"
		}

        //part one
		var mould_button_container = {
			"display": "block"
		}

		var mould_prev_button_position = {
			"left":options.left_spacing
		}

		var mould_post_button_position = {
			"right":options.right_spacing
		}

		var mould_button_image_arrow = {
			"cursor": "pointer",
			"display": "block",
			"position": "absolute",
			"z-index": "1"
		}

		mould_button_image_arrow = $.extend(mould_button_image_arrow, options.button_arrow_position_size);

		//part two
		var mould_image_container = {
			"position": "relative"
		}

		var mould_image_container_li = {
		    "display": "inline-block",
		    "display": "inline"
		}

        //part three
		var mould_dot_container = {
			"position": "absolute",
			"height": options.dot_container_height,
			"text-align": "center",
			"font-size": "0",
			"border-radius": options.dot_container_border_radius,
			"background": options.dot_container_background
		}

		mould_dot_container = $.extend(mould_dot_container, options.dot_container_position);

		var mould_dot_container_li = {
			"border-radius": "50%",
			"margin": options.dot_margin,
			"display": "inline-block",
			"width" : options.dot_width,
			"height": options.dot_height,
			"cursor": "pointer",
			"background-color": "#B7B7B7"
		}

		var mould_dot_container_li_selected = {
			"background": options.dot_selected_color
		}

		/*
		1.this => the slider container
		2.$ppbc => the buttons container
		3.$ismc => the images container
		4.$dmbc => the dots container
		5.$imgs => all <img>s
		*/
        
		this.css(clear_element_spacing);
		this.find("*").css(clear_element_spacing);

		this.find("li").css(clear_list_style);
		this.css(mould_slider_outline);
		$ppbc.css(mould_button_container);
		$("#pre-btn").css(mould_prev_button_position);
		$("#pos-btn").css(mould_post_button_position);
		$("#pre-btn").css(mould_button_image_arrow);
		$("#pos-btn").css(mould_button_image_arrow);
		$ismc.css(mould_image_container);
		$ismc.find("li").css(mould_image_container_li);
		
		$dmbc.css(mould_dot_container);

		var page = 1;
		var timer = null;
		var page_count = $imgs.length;

		var dot_list = "";
		for(var i = 0; i < page_count; i ++) {
			dot_list += "<li></li>";
		}
		$dmbc.append(dot_list);
		$dmbc.find("li").css(mould_dot_container_li);
		$dmbc.find("li").eq(0).css(mould_dot_container_li_selected);
       

		$ismc.width(options.width * page_count);

		function move(id) {
			if(!$ismc.is(":animated")) {
			    if(id == "pre-btn") {
			    	if(page == 1) {
			    		page = page_count;
			    		$ismc.animate({
			    			"left": -options.width * (page_count - 1)
			    		});
			    		dotMove();
			    	}else {
			    		page --;
			    		$ismc.animate({
			    			"left": -options.width * (page - 1)
			    		}, "slow");
			    		dotMove();
			    	}
			    }else {
			    	if(page == page_count) {
			    		page = 1;
			    		$ismc.animate({
			    			"left": 0
			    		});
			    		dotMove();
			    	}else {
			    		page ++;
			    		$ismc.animate({
			    			"left":  -options.width * (page - 1)
			    		}, "slow");
			    		dotMove();
			    	}
			    }
			}
		}

		function dotMove() {
			$dmbc.find("li").css("background-color", "#B7B7B7");
			$dmbc.find("li").eq(page-1).css(mould_dot_container_li_selected);
		}

		this.mouseover(function() {
			$ppbc.css({
				"display": "block"
			});
			clearInterval(timer);
		}).mouseleave(function() {
			$ppbc.css({
				"display": "none"
			});
			clearInterval(timer);
			timer = setInterval(move, options.frequency);
		}).trigger("mouseleave");

        $ppbc.find("img").mouseover(function() {
        	$(this).animate({
        		"width": this.width * 1.15,
        		"height": this.height * 1.15
        	}, 'fast');
        	$ppbc.animate({
        		"display": "block"
        	});
        	return false;
        }).mouseleave(function() {
        	$(this).animate({
        		"width": this.width / 1.15,
        		"height": this.height / 1.15
        	}, 'fast');
        	$ppbc.animate({
        		"display": "none"
        	});
        	return false;
        }).click(function() {
        	move($(this).attr("id"));
        });

		$dots_btn = $dmbc.find("li");
		$dots_btn.on("click", function() {
			page = $dots_btn.index(this) + 1;
			$ismc.animate({
				"left": -options.width * (page - 1)
			}, "slow");
			dotMove();
		});
	}

})(jQuery);