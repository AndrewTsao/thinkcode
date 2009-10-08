(function(){

/**
 * @author bility
 * @date 2009-09-11
 * @exception help class for AP.sim 
 */
	var Undefined,
		Help;
	Help = window.Help = function( e ){
		return new Help.fn.init( e );
	};
	
	Help.fn = Help.prototype = {
		init : function( e ){
			if( typeof e == 'string'){
				this[ 0 ] = document.getElementById( e );
				this.length = 1;
				return this;
			}
			
			if( typeof e == 'object'){
				this.length = 0;
				if( e.length ){
					var current = this;
					Help.fn.each(e,function( i,o ){
						if( o.nodeName ){
							current[ i ] = o;
							current.length++;
						}
					});
				}else{
					this[ 0 ] = e;
					this.length = 1;
					return this;
					
				}
				
				return this;
			}
			
			return this;
		},
		length : 0,
		size : function(){
			return this.length;
		},
		each : function(o,fn){
			if( fn == Undefined ){
				fn = o;
				o = this;
			}
			
			if( o.length ){
				for(var i = 0, j = o.length; i < j; i++){
					fn( i, o[ i ]);
				}
			}else if( o == this ){
				for(var i = 0, j = this.size(); i < j; i++){
					fn( i, this[ i ]);
				}
			}else{
				for(var i in o){
					fn( i,o[ i ]);
				}
			}
			return this;
		},
		/**
		 * @exception get or set the value of style
		 * @param k
		 * @param v
		 * @return if( v == Undefined ){return this}else{set the style value of this and return this}
		 */
		css : function(k,v){
			k = k.replace(/-[A-Za-z]/g,function(r){
				return r.replace('-','').toUpperCase();
			   }).
			     replace('float','cssFloat');
			
			
			if( v == Undefined ){
				if( this.size() ){
					return this[ 0 ].style[ k ];
				}
			}
			this.each(function( i,o ){
				o.style[ k ] = v;
			});
			return this;
		},
		/**
		 * @exception get or set the value of attribute
		 * @param k
		 * @param v
		 * @return if( v == Undefined ){return this}else{set the attribute value of this and return this}
		 */
		attr : function(k,v){
			 if(v == Undefined ){
				 if( this.size() ){
					 return this[ 0 ].getAttribute( k );
				 }
			 }
			 
			 this.each(function(i,o){
				 if( v.length ){
					 o.setAttribute(k,v);
				 }else{
					 o.removeAttribute( k );
				 }
			 });
			 return this;
			
		},
		/**
		 * @exception get or set the value of element
		 * @param k
		 * @param v
		 * @return if( v == Undefined ){return this}else{set the element value of this and return this}
		 */
		html : function(v){
			if( v == Undefined ){
				if( this.size() ){
					return this[0].innerHTML;
				}
			}
			this.each(function(i,o){
				o.innerHTML = v;	
			});
		},
		addEvent : function(type,fn){
			this.each(this, function(i,o){
				if(o.addEventListener){
					o.addEventListener(type,fn,false);
				}
				else if(o.attachEvent){
					o["e"+type+fn]=fn;
					o[type+fn]=function(){o["e"+type+fn](window.event);};
					o.attachEvent("on"+type,o[type+fn]);
				}
			});	
			return this;
		},
		click : function( fn ){
			return this.addEvent('click', fn);
		},
		mouseOver : function( fn ){
			return this.addEvent('mouseover', fn);
		},
		mouseOut : function( fn ){
			return this.addEvent('mouseout', fn);
		},
		change : function( fn ){
			return this.addEvent('onchange', fn);
		},
		insertBefore : function(k){
			if( this.size() ){
				this.each( function( i, o ){
					o.parentNode.insertBefore( k, o);
				});
			}
			return this;
		},
		emp : function(){return 'h';}
	};
	
	Help.fn.init.prototype = Help.fn;
	
		
	var AP = window.AP = (typeof AP == 'object') ? AP : {};
	AP.sim = {
			select : function( obj,style ){	
				var sObj = obj,
					cObj,
					tObj;
				
				this.obj = sObj;
			
				var divDom = document.createElement( 'div' );
				Help( divDom ).attr('class','simusSelect');
			
				var divCDom = document.createElement( 'div' );
				Help( divCDom ).attr('class','content')
			
				Help(sObj.options).each(function( i , o){
					if( o.selected ){
						Help(divCDom).html( o.text );
						return;
					}
				});

				Help(divCDom).click(function(event){
					this.nextSibling.style.zIndex = (this.nextSibling.style.zIndex == '9999') ?
														'-9999' :
														'9999';
					event = window.event || event; 
					
					event.cancelBubble = true; 
				});
				
				Help(document).click(function(){
					if( tObj.style.zIndex == '9999'){
						Help(tObj).css( 'zIndex','-9999' );
					}
				});
				cObj = divCDom;
				divDom.appendChild( divCDom );
			
				var ulDom = tObj = document.createElement( 'ul' );
			
				Help(sObj.options).each(function( i, o  ){
					var liDom = document.createElement( 'li' );
					var liText = document.createTextNode( o.text );
						Help(liDom).mouseOver(function(){
							Help(this).attr('class','hover');
						});
						Help(liDom).mouseOut(function(){
							var _val = sObj.value;
							var _txt = '';
							Help( sObj.options ).each(function( j ,m ){
								if(m.value == _val){
									_txt = m.text;
									return;
								}
							});
							
									
									
							var liArr = ulDom.getElementsByTagName( 'li' );
							Help( liArr ).each(function(j, m){
								if( m.innerHTML == _txt ){
									Help( m ).attr('class','hover');
								}else{
									Help( m ).attr('class','');
								}
							});
							
						});
						Help(liDom).click(function(){
							Help( cObj ).html( Help( this ).html() );
							Help( this ).attr( 'class', 'hover' );
							
							Help(sObj.options).each(function(j,m){
								m.selected = ( m.text ==  this.innerHTML) ? true : false;
							});
							
						});	
						liDom.appendChild( liText );
						ulDom.appendChild( liDom );
				});
			
			
				divDom.appendChild( ulDom );
				
				
				Help(divDom).css( 'position','absolute' );
				Help(this.obj).css( 'visibility','hidden' );
				this.obj.parentNode.insertBefore( divDom, this.obj );
			},
			/**
			*
			*
			*
			*/
			radio : function(chkBox,style){
				var checkClass = style || {
					'unchecked':'simusRadioBox',
					'checked':'simusRadioChecked'
				};

				Help( chkBox ).each(function( i,o ){
					var divDom = document.createElement( 'input' );
						Help(divDom).
							attr('type','button').
							attr('class',o.checked ? checkClass['checked'] : checkClass['unchecked']).
							click(function(){
								var tp = this.nextSibling.type.toLowerCase();
								switch( tp ){
									case 'radio':
										this.nextSibling.checked = true;
										Help(chkBox).each(function(j,m){
											m.previousSibling.className = m.checked  ?
																				checkClass['checked'] :
																				checkClass['unchecked'];
												
										});
										break;
									case 'checkbox':
										this.nextSibling.checked = this.nextSibling.checked ? false:true;
										this.className = this.nextSibling.checked ? 
														checkClass['checked'] :
														checkClass['unchecked'];
								}
							});
							
							Help( o ).
								css( 'position' ,'absolute').
								css( 'z-index' ,'-1' ).
								css( 'visibility' , 'hidden' ).
								insertBefore( divDom );
				});
	
			},
			checkbox : function( chkBox,style ){
				return AP.sim.radio( chkBox,{
					'unchecked':'simusCheckBox',
					'checked':'simusCheckChecked'
				});
			},
			file     : function(fileForm,text,style){
				var newFileText = document.createElement( 'input' );
					Help(newFileText).
									attr('type','text').
									attr('class','simusFileText').
									attr('value','');
				fileForm.parentNode.insertBefore( newFileText,fileForm);
				
				var newFileBtn = document.createElement( 'input' );
					Help( newFileBtn ).
									attr('type','button').
									attr('class','simusFileBtn').
									attr('value',text ? text : '浏览...');
				fileForm.parentNode.insertBefore(  newFileBtn,fileForm);
				
				
				Help(fileForm).
						css( 'position' , 'absolute').
						css( 'z-index' , '9999' )
				Help(fileForm).change(fileForm,'change',function(){
					newFileText.value = fileForm.value;
				});
				/*
				if(Help.Browser.IE ){
					fileForm.filters.alpha.Opacity = '0';
				}else{
					fileForm.style.opacity = '0';
				}
				*/
			}
	};
})();