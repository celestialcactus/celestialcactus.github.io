/*
var stickyHeaders = (function() {

    var $window = $(window),
        $stickies;
  
    var load = function(stickies) {
  
      if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {
  
        $stickies = stickies.each(function() {
  
          var $thisSticky = $(this).wrap('<div class="followWrap" />');
    
          $thisSticky
              .data('originalPosition', $thisSticky.offset().top)
              .data('originalHeight', $thisSticky.outerHeight())
                .parent()
                .height($thisSticky.outerHeight()); 			  
        });
  
        $window.off("scroll.stickies").on("scroll.stickies", function() {
            _whenScrolling();		
        });
      }
    };
  
    var _whenScrolling = function() {
  
      $stickies.each(function(i) {			
  
        var $thisSticky = $(this),
            $stickyPosition = $thisSticky.data('originalPosition');
  
        if ($stickyPosition <= $window.scrollTop()) {        
          
          var $nextSticky = $stickies.eq(i + 1),
              $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');
  
          $thisSticky.addClass("fixed");
  
          if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {
  
            $thisSticky.addClass("absolute").css("top", $nextStickyPosition);
          }
  
        } else {
          
          var $prevSticky = $stickies.eq(i - 1);
  
          $thisSticky.removeClass("fixed");
  
          if ($prevSticky.length > 0 && $window.scrollTop() <= $thisSticky.data('originalPosition') - $thisSticky.data('originalHeight')) {
  
            $prevSticky.removeClass("absolute").removeAttr("style");
          }
        }
      });
    };
  
    return {
      load: load
    };
  })();
  
  $(function() {
    stickyHeaders.load($(".followMeBar"));
  });
  */
/*
 const StickySubsections = (function(){
    let el
  
    return {
      elements: function () {
        return {
          stickies: [...document.querySelectorAll('.followMeBar')]
        }
      },
  
      init: function () {
        el = this.elements()
        this.load()
      },
  
      load: function () {
        this.setupStickyWrap()
        window.addEventListener('scroll', () => this.whenScrolling())
      },
  
      setupStickyWrap: function(){
        el.stickies.forEach((sticky, i) => {
          const stickyWrap = this.addWrap(sticky, 'sticky-wrap')
          const heightToTop = sticky.getBoundingClientRect().top + window.scrollY
          const outerHeight = sticky.offsetHeight
  
          stickyWrap.parentElement.id = `sticky-content-${i}`
          sticky.setAttribute('data-originalPosition', heightToTop)
          sticky.setAttribute('data-originalHeight', outerHeight)
  
          stickyWrap.style.height = outerHeight + 'px'
        })
      },
  
      addWrap: function(el, className, wrap = 'div') {
        const wrapper = document.createElement(wrap)
        wrapper.classList.add(className)
        el.parentNode.insertBefore(wrapper, el)
        wrapper.appendChild(el)
        return wrapper
      },
  
      elementExists: function(el){
        return typeof(el) != 'undefined' && el != null
      },
  
      stickyPosition: function(el){
        return el.getAttribute('data-originalPosition')
      },
      
      nextStickyPosition: function(current, next){
        return next.getAttribute('data-originalPosition') - current.getAttribute('data-originalHeight')
      },
  
      scrollingPositionTop: function(el){
        return el.getBoundingClientRect().top + window.scrollY
      },
      
      offsetTop: function(el){
        return el.getBoundingClientRect().top
      },
  
      scrollingPositionBottom: function(el){
        return el.getBoundingClientRect().bottom + window.scrollY
      },
  
      headerPosition: function(){
        return window.scrollY
      },
      
      bottomSectionHit: function(contentElement, sticky){
        const contentSection = document.getElementById(contentElement)
        const sectionBottom = contentSection.getBoundingClientRect().bottom + window.scrollY
        const stickyPositionScrolling = sticky.getBoundingClientRect().bottom + window.scrollY
  
        return stickyPositionScrolling >= sectionBottom
      },
  
      whenScrolling: function() {
        el.stickies.forEach((sticky, i) => {
          const nextSticky = el.stickies[i + 1]
          const prevSticky = el.stickies[i - 1]
  
          if (this.stickyPosition(sticky) <= this.headerPosition()) {
            sticky.classList.add('fixed')
  
            if (this.elementExists(nextSticky)) {
              
              while (this.scrollingPositionBottom(sticky) >= this.nextStickyPosition(sticky, nextSticky) + 50) {
                sticky.classList.add('absolute')
                sticky.style.top = this.nextStickyPosition(sticky, nextSticky)
              }
  
            // Handle last sticky element
            } else {
              if (this.bottomSectionHit(`sticky-content-${i}`, sticky)) {
                sticky.classList.remove('fixed')
              }
            }
  
          } else {
  
            sticky.classList.remove('fixed')
  
            if (this.elementExists(prevSticky) && window.scrollY <= this.stickyPosition(sticky)){
              prevSticky.classList.remove('absolute')
              prevSticky.removeAttribute('style')
            }
          }
        })
      }
  
    }
  }())
  
  StickySubsections.init()
  */

 function UpdateTableHeaders() {
    $(".persist-area").each(function() {
    
        var el             = $(this),
            offset         = el.offset(),
            scrollTop      = $(window).scrollTop(),
            floatingHeader = $(".floatingHeader", this)
        
        if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
            floatingHeader.css({
             "visibility": "visible"
            });
        } else {
            floatingHeader.css({
             "visibility": "hidden"
            });      
        };
    });
 }
 
 // DOM Ready      
 $(function() {
 
    var clonedHeaderRow;
 
    $(".persist-area").each(function() {
        clonedHeaderRow = $(".persist-header", this);
        clonedHeaderRow
          .before(clonedHeaderRow.clone())
          .css("width", (clonedHeaderRow.width() + 10))
          .addClass("floatingHeader");
          
    });
    
    $(window)
     .scroll(UpdateTableHeaders)
     .trigger("scroll");
    
 });