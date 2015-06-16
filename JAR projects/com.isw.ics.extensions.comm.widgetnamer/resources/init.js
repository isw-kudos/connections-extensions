dojo.provide("com.isw.ics.extensions.comm.widgetnamer.init");
console.log('widgetnamer loaded');
//SCRIPT TO ALLOW RENAMING COMMUNITY WIDGET INSTANCES
(function(){
	var renameWidgets = function(){
		if(widgetUserInfo.canPersonalize=="true")
		{
			var widgetNodes = dojo.query("#contentArea .lotusWidget2 .ibmDndDragHandle .lotusLeft");
			widgetNodes.addClass("widget-title-rename");
			//Prompt for rename on click
			widgetNodes.connect("click",function(event){
				var widgetId = event.target.id.slice(0,-2);
				console.log("widgetId",widgetId);
				var w = window["_"+widgetId+"_iContext"].iScope().iContext.getiWidgetAttributes();
				var currentTitle = w.getItemValue("computedWidgetTitle");
				var newTitle = prompt("Enter a new title for this Widget",currentTitle);
				if(newTitle!=currentTitle)
				{
					w.setItemValue("widgetTitle",newTitle);
					w.save();
				}
			});
		}
	}
	if(iswExtensions) {
		iswExtensions.addCssStyle('.widget-title-rename:hover {cursor: pointer !important;text-decoration:underline;}.widget-title-rename:hover:after {content:"edit";font-size:0.8em;margin-left:8px;text-decoration:none;}');
		iswExtensions.loadWhenReady(renameWidgets, [
		  function(){
			return ibmConfig && ibmConfig.serviceName==='communities' &&
				(window.location.pathname.indexOf('communitystart')>-1 ||
				 window.location.pathname.indexOf('communityoverview')>-1 ||
				 window.location.pathname.indexOf('communityview')>-1 );
		  },
		  function(){
		   return dojo.byId("widget-container-col2")!=null;
		  }
		],true);
	} else console.error('missing dependency - iswExtensions');
})();


