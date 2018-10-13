
var syntax_html = (function(content,theme){

	theme = 'theme-'+theme;
	

	content = content.replace( /\</gm,function(match,string,length){
		return '&lt;';
	});


	// comments > /* */
	content = content.replace( /(&lt;!--[\s\S]*?-->)/gm,'<span class=" html tag-comment-block">$1</span>');
	

	// javascript inline
	content = content.replace( /&lt;script[^\0]*?&lt;\/script>/gm ,function(match,string,length){		
			var matchArray = String(match).split(/>/g);
			var join ='';
			for(var key in matchArray){
				var val = matchArray[key];
				

				if(key >=matchArray.length-1)
					var op = '';
				else
					var op = '>';

				if(/&lt;script(.*)/gm.test(val)){

					join += val+op;
					continue;
				}if(/&lt;\/script/gm.test(val)){
					op = '';		
				}

				val = val.replace( /&lt;script(.*)/gm,'');
				val = val.replace( /&lt;\/script/gm,'');

			
				val = syntax_javascript(val,theme);
				join += val+op;
			}
		
		
		return join+'&lt;/script>';
	});


	// css inline
	content = content.replace( /&lt;style[^\0]*?&lt;\/style>/gm ,function(match,string,length){		
	

			var matchArray = String(match).split(/>/g);
			var join ='';
			for(var key in matchArray){
				var val = matchArray[key];
				

				if(key >=matchArray.length-1)
					var op = '';
				else
					var op = '>';

				if(/&lt;style(.*)/gm.test(val)){

					join += val+op;
					continue;
				}if(/&lt;\/style/gm.test(val)){
					op = '';		
				}

				val = val.replace( /&lt;style(.*)/gm,'');
				val = val.replace( /&lt;\/style/gm,'');

			
				val = syntax_css(val,theme);
				join += val+op;
			}
		
		
		return join+'&lt;/style>';
	});



	content = content.replace( /&lt;(.*?)>/g,function(match,string,length){
		
		$bracketMin = '<';
		$bracketMax = '>';

		match = match.replace(/\&lt\;/g,'<');
		match = match.replace(/\&gt\;/g,'>');
		
		var BeforeMatch = match;
		match = match.substr(1);
		
		if(BeforeMatch.substr(BeforeMatch.length-1) == '>')	
			match = match.substr(0,match.length-1);
		else
			match = match.substr(0,match.length);
				
		var matchArray = match.split(' ');
		
		for(var key in matchArray){
			var val = matchArray[key];	
			if(val.substr(0,1) == '<'){
				val = '&lt;'+val.substr(1);
				 matchArray[key] = val;
			}
		}

		var tag = null;
		var join = '';
		join += '<span class=" html cm-bracket">'+$bracketMin+'</span>';
		for(var key in matchArray){
			var val = matchArray[key];

			if(key == 0){
				join += '<span class=" html cm-tag">'+val+'</span>';
				tag = val;
			}else{

				if(val == ''){
					join += ' ';
				}else{
					join += ' ';

					if( val.indexOf('=') !=-1 ){

						join += '<span class=" html cm-attribute">';
						var valArray = val.split(/(.+)\=(.*)/g);
						var valKey = valArray[1];
						var valValue = valArray[2] ;
		
						
							if(valKey != undefined && valKey != ''){
								join += '<span class=" html cm-attribute-key">'+valKey+'</span>';
								if(valKey != ''){ 
									join += '<span class=" html cm-attribute-operator">=</span>';
								}else{
									join += val+'&nbsp;';
								}
							}else{
								join += val+'';
							}

							
							if(valValue != undefined && valValue != '') join += '<span class=" html cm-attribute-value">'+valValue+'</span>';

							join += '</span>';

					}else{
						join += val+'';
					}
				}
			}
		}


		if(BeforeMatch.indexOf('>') != -1){
			join += '<span class=" html cm-bracket">'+$bracketMax+'</span>';
		}

		return join;
	});

	return content;
});







// Javascript --------------------------------------------------



var syntax_javascript = (function(content,theme){

	theme = 'theme-'+theme;



	content = content.replace( /\</gm,function(match,string,length){
		return '&lt;';
	});

	

	// strings
	content = content.replace( /([\"|\'](.*)[\"|\'])/gm,'<span class=" javascript string">$1</span>');

	// number
	content = content.replace( /([0-9])/gm,'<span class=" javascript number">$1</span>');

	// undefined and null
	content = content.replace( /(null|undefined)/gm,'<span class=" javascript number">$1</span>');

	// comments > //
	content = content.replace( /\/\/(.*)/gm,'<span class=" javascript tag-comment">//$1</span>');

	// comments > /* */
	content = content.replace( /(\/\*[\s\S]*?\*\/)/gm,'<span class=" javascript tag-comment-block">$1</span>');


	// functions = ex: function a(){}
	content = content.replace( /(function) (.*)\((.*?)\)(.*)?\{/gm,
		'<span class=" javascript word-func">$1</span> '
		+'<span class=" javascript word-func-name">$2</span>'
		+'(<span class=" javascript word-func-parameters">$3</span>)$4{'
		
		);

	content = content.replace( /(if *?)\((.*?)?\)/gm,
		'<span class=" javascript word-if">$1</span>'	
		+'(<span class=" javascript if-parameters">$2</span>)'
		
		);

	


	var keywordsArray = ['function','var ','class '];
	var regexKeyword = new RegExp('('+keywordsArray.join('|')+')','gm');
	content = content.replace( regexKeyword,'<span class=" javascript keyword">$1</span>');

	var keywordsBArray = ['new ','for',' in ','else','return '];
	var regexBKeyword = new RegExp('('+keywordsBArray.join('|')+')','gm');
	content = content.replace( regexBKeyword,'<span class=" javascript keywordB">$1</span>');

	var objectReservedArray = ['this.'];
	var objectKeyword = new RegExp('('+objectReservedArray.join('|')+')','gm');
	content = content.replace( objectKeyword,'<span class=" javascript objectreserved">$1</span>');


	var methodReservedArray = ["alert","prompt","replace","substr","constructor"];
	for(var key in methodReservedArray){
		var word = methodReservedArray[key];
		var regexMethodReserved = new RegExp('('+word+')\\(','g');
		content = content.replace( regexMethodReserved,'<span class=" javascript methodreserved">$1</span>(');		
	}


	content = content.replace( /[\(|\)]/gm,function(match,string,length){
		return '<span class=" javascript char-parentheses">'+match+'</span>';
	});

	


	
	content = content.replace( /[\{|\}]/gm,function(match,string,length){
		return '<span class=" javascript char-key">'+match+'</span>';
	});

	return '<span class=" javascript wrapper-code">'+content+'</span>';


});




// CSS --------------------------------------------------

var syntax_css = (function(content,theme){

	theme = 'theme-'+theme;



	content = content.replace( /\</gm,function(match,string,length){
		return '&lt;';
	});

	

	content = content.replace( /(&lt;(.*?)>)/g,'$1');

	content = content.replace( /([\"|\'].*[\"|\'])/gm,'<span class=" css string">$1</span>');
	content = content.replace( /([0-9])/gm,'<span class=" css number">$1</span>');
	

	var keywordsArray = ['color','background','height'];
	var regexKeyword = new RegExp('('+keywordsArray.join('|')+')','gm');
	content = content.replace( regexKeyword,'<span class=" css key-name">$1</span>');

	// comments > /* */
	content = content.replace( /(\/\*[\s\S]*?\*\/)/gm,'<span class=" css tag-comment-block">$1</span>');


	content = content.replace( /\.([a-zA-Z0-9]*)[a-zA-Z0-9]*/gm,'<span class=" css selector-class">.$1</span>');
	
	content = content.replace( /\#([a-zA-Z0-9]*)[a-zA-Z0-9]*/gm,'<span class=" css selector-id">#$1</span>');


	content = content.replace( /([^}]*)\{/gm,'<span class=" css selector-global">$1</span>{');

	content = content.replace( /:([^\;]*);/gm,':<span class=" css key-value">$1</span>;');
	
	content = content.replace( /( [^a-zA-Z0-9|^{}:;\t#\. ] )/g,'<span class=" css selector-operator">$1</span>');

	content = content.replace( /[\{|\}]/gm,function(match,string,length){
		return '<span class=" css char-key">'+match+'</span>';
	});


	

	return '<span class=" css wrapper-code">'+content+'</span>';


});




// Terminal --------------------------------------------------

var syntax_terminal = (function(content,theme){

	theme = 'theme-'+theme;


	var keywordsArray = ['mv','cp','apt-get','bower','node','npm','ls','dir','cd'];
	var regexKeyword = new RegExp('('+keywordsArray.join('|')+')','gm');
	content = content.replace( regexKeyword,'<span class=" terminal keyword">$1</span>');

	
	var keywordsArray = ['sudo','exit'];
	var regexKeyword = new RegExp('('+keywordsArray.join('|')+')','gm');
	content = content.replace( regexKeyword,'<span class=" terminal keywordB">$1</span>');

	

	return '<span class=" css wrapper-code">'+content+'</span>';


});


