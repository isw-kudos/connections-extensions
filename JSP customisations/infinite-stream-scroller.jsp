<script type="text/javascript">

(function(){


  var scrollEvent,scrollTimeout = false, scrollCount=0,intervalCount=0 ;
  var mapInfiniteScrollEvent = function(){
    if(scrollEvent) dojo.disconnect(scrollEvent);
    scrollEvent = dojo.connect(window, 'scroll', function(){
      // console.log('called scroll', scrollCount++);
      if(scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(scrollFunc, 200);
    });
  };

  var lastClick = new Date();
  var scrollFunc = function(){
    // console.log('called scrollfunc', intervalCount++);
    var scrollPos = getScrollTop();
    var documentHeight = getDocHeight();
    var windowHeight = window.innerHeight;
    // console.log('scrolling window', scrollPos, documentHeight, windowHeight);
    if(scrollPos >= documentHeight - windowHeight - ncConfig.infiniteScrollThreshold){
      var thisClick = (new Date()).getTime();
      if(thisClick - lastClick < ncConfig.showMoreBtnClickDelay) return;
      var showMoreBtn = dojo.query(ncConfig.domQueries.showMoreBtn);
      if(showMoreBtn && showMoreBtn.length==1 && dojo.style(showMoreBtn[0],'display'!=='none')){
        lastClick = thisClick;
        iswTweaks.fireClickEvent(showMoreBtn[0]);
      }
      else
        console.error('InfiniteScroller: No Show More btn found', ncConfig.domQueries.showMoreBtn);
    }
  };

  function getDocHeight() {
    var D = document;
    return Math.max(
      Math.max(D.body.scrollHeight,D.documentElement.scrollHeight),
      Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
      Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
  }

  function getScrollTop(){
    if(typeof pageYOffset!= 'undefined'){
        //most browsers except IE before #9
        return pageYOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
  }
  if(iswTweaks) {
    iswTweaks.loadWhenReady(mapInfiniteScrollEvent, [
      function(){
        return ibmConfig && ibmConfig.serviceName==='homepage' && window.location.pathname.indexOf('updates')>-1;
      }
    ]);
  } else console.error('missing dependency - iswTweaks');

})();

</script>
