dojo.provide("com.isw.ics.extensions.dogear.opener.init");
console.log('bookmark opener loaded');
//SCRIPT TO OPEN BOOKMARKS IN NEW TAB BY DEFAULT
(function(){
	var openInNewTab = function(linkNodes){
		linkNodes.attr("target","_blank");
	}
	if(iswExtensions) {
		iswExtensions.loadWhenReady(openInNewTab, [
       function(){
    	   return ibmConfig && ibmConfig.serviceName==='dogear';
       },
       function(){
    	   var nodes = dojo.query('.lotusTable h4 a[id*="bmlink_"]');
    	   if(nodes.length>0)
    		   return nodes;
       }
       ],true);
	} else console.error('missing dependency - iswExtensions');
})();