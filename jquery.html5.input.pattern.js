/**
*	@name							Patternfallback
*	@descripton						Makes HTML5 input pattern attribute available in older browsers
*	@version						0.0.1
*	@requires						Jquery 1.3.2
*
*	@author							Florian Ruechel
*	@author-email					florian.ruechel@gmail.com
*
*	@licens							GPL
*
*/

(function($){
     $.fn.extend({
         patternFallback: function(callback) {

			var nativePatternSupport = (function(){
				var i = document.createElement('input');
				return ('pattern' in i);
			})();
				
			// Pattern Check will halt here if the browser
			// has native support for the placeholder attribute
			if(nativePatternSupport){
				return false;
			}
            
            console.log("This is a test");
            
            return this.each(function(index, element) {
				
				// Executing Pattern Fallback twice on an element will lead to trouble
				if($(this).data('patterned')){
					return false;
				}
				
				var input				=	$(this),
					pattern     		=	input.attr('pattern'),
                    value               =   input.val(),
                    regex               =   new RegExp(pattern);
				
				input.data('patterned', true);
                
                //set own check function
                input.get(0).checkValidity = function() {
                    var input = jQuery(this),
                        pattern = input.attr('pattern'),
                        value = input.val(),
                        regex = new RegExp(pattern),
                        valid = Boolean(value.match(regex))
                        if(input.get(0).validity == undefined)
                            input.get(0).validity = {};
                        input.get(0).validity.valid = valid;
                    if(valid) {
                        if(input.hasClass("invalid"))
                            input.removeClass("invalid");
                        return true;
                    } else {
                        if(!input.hasClass("invalid"))
                            input.addClass("invalid");
                        return false;
                    }
                };
                console.log("checkValidity Attribute set", input.get(0).checkValidity, input.get(0).validity);
                
                
				/*	
				// Create clone and switch
				var $clone = createClone();
				
				// Add clone to callback arguments
				callbackArguments.clone = $clone;
				
				$clone.insertAfter($input);
				
				var setState = function() {
					if( $input.val().length <= 0 ){
						$clone.show();
						$input.hide();
					} else {
						$clone.hide();
						$input.show().trigger('click');
					}
				};
				
				// Events for password fields
				$input.bind('blur', setState);
				
				// Create a input element clone
				function createClone(){
					
					var $el;
					
					if($input.context.nodeName.toLowerCase() == 'input') {
						$el = $("<input />").attr({
							'type'	: 'text'
						});
					} else if($input.context.nodeName.toLowerCase() == 'textarea') {
						$el = $("<textarea />");	
					} else {
						throw 'PatternChecker only works with input and textareas'; 
					}
					
					$el.attr({
						'value'		: defaultValue,
						'class'		: $input.attr('class')+' empty',
						'size'		: $input.attr('size'),
						'style'		: $input.attr('style'),
						'tabindex' 	: $input.attr('tabindex'),
						'rows' 		: $input.attr('rows'),
						'cols'		: $input.attr('cols'),
						'name'		: 'defaultvalue-clone-' + (((1+Math.random())*0x10000)|0).toString(16).substring(1)
					});
					
					$el.focus(function(){
					
						// Hide text clone and show real password field
						$el.hide();
						$input.show();
						
						// Webkit and Moz need some extra time
						// BTW $input.show(0,function(){$input.focus();}); doesn't work.
						setTimeout(function () {
							$input.focus();
						}, 1);
					
					});				
					
					return $el;
				}*/

				//setState();
				
				if(callback){
					callback(callbackArguments);
				}	
				
            });
        }
    });
})(jQuery);