//horizontal scrolling monografie
var scrollSection = $(document).ready(function() {

  //cache our items and containers
  var items = $(".section_mono");
  var scrollContainer = $(".scrolling-wrapper");


  /**
   * Fetches the next or previous item from items
   *
   * @param conntainer {JQueryElement} scroll-container in which the items can be found
   * @param items {Array} items to be searched through
   * @param isNext {boolean} set to true (default) if you want the next item, to false if you want the previous one
   * @returns {*}
   */
  function fetchItem(container, items, isNext) {
      var i,
          scrollLeft = container.scrollLeft();

      //set isNext default to true if not set
      if (isNext === undefined) {
          isNext = true;
      }

      if (isNext && container[0].scrollWidth - container.scrollLeft() <= container.outerWidth()) {
          //we reached the last one so return the first one for looping:
          return $(items[0]);
      }

      //loop through items
      for (i = 0; i < items.length; i++) {

          if (isNext && $(items[i]).position().left > 0) {
              //this item is our next item as it's the first one with non-negative "left" position
              return $(items[i]);
          } else if (!isNext && $(items[i]).position().left >= 0) {
              //this is our previous item as it's the one with the smallest negative "left" position
              //if we're at item 0 just return the last item instead for looping
              return i == 0 ? $(items[items.length - 1]) : $(items[i-1]);
          }
      }

      //nothing found
      return null;
  }

  /**
   * Moves the scrollcontainer to the next/previous item (depending on event.data.direction).
   *
   * @param event
   */
  function moveToItem(event) {
      //fetch the next/previous item:
      var isNext = event.data.direction == "next";
      var item = isNext ? fetchItem(scrollContainer, items, true) : fetchItem(scrollContainer, items, false);

      if (item) {
          //scroll to item
          scrollContainer.animate({"scrollLeft": item.position().left + scrollContainer.scrollLeft()}, 400);
      }
  }

  //bind events
  $(".arrow-left").click({direction: "prev"}, moveToItem);
  $(".arrow-right").click({direction: "next"}, moveToItem);

});


//populate the mono_link div with the sub-titles of section
$(document).ready(function() {
    var scrollContainer = $(".scrolling-wrapper");
   
    var titles = $('.scheda_link');
    titles.each(function(){
        $('.mono_link').append("<a class='rel_link' href='#"+$(this).attr('id')+"' aria-label='go to sub-section'>"+$(this).text()+"</a>") //href='#"+$(this).attr('id')+"'
    });

    //center the div
    $('.rel_link').each(function(){
        $(this).click(function(){
            var id = $(this).attr('href');
            
            scrollContainer.animate({"scrollLeft": $(id).position().left + scrollContainer.scrollLeft()}, 400);
        });
    });
});



//slider

$(document).ready(function(){

    //create elements
    $('.slider').each(function(){
        $slider = $(this);
        var $slider_block = $slider.find($('.slider-block'));
        $slider_block.append('<div class="pagination-slider"></div>') //add the div for the pagination

        var titles_pagination = $slider.find($('.slider-title'));
        titles_pagination.each(function(index){
            $slider.find($('.pagination-slider')).append('<div class="select-image" alt="go to image" data-index="'+index+'" role="tab" tabindex="0"><span>'+$(this).text()+'</span></div>') //gets the titles and relative urls to the slider items
        });
        
        $slider.find($('.imageslide')).each(function( i, el ){ //add a numbered id for each figure
            $(el).attr('id','image-num-'+i);
        });

        //if there are more than 8 figures, make 2 columns of selection buttons. For more info see: https://api.jquery.com/jquery/#jQuery2
        i = 0;
        lenChild = $slider.find($('.select-image')).length;
        if ( lenChild >= 8) {
            var parentContainer = $slider.find($('.pagination-slider'));
            parentElem = 0;
            $(this).find('.select-image').each(function(){
                if(i < lenChild) {
                    if(i%8 == 0) {
                        if(i != 0)
                        $(parentElem).appendTo($(parentContainer));
                        //parentElem = css("float", "left");
                        parentElem = $('<div class="column-slider"></div>');
                    }
                $(this).appendTo($(parentElem));
                i++;
                }
            });
            $(parentElem).appendTo($(parentContainer));
        }
    });

    //select and change figure
    
    $('.slider').each(function(){
        $slider = $(this);

        var $slides = $slider.find($('.imageslide')); 
        var $selectors = $slider.find($('.select-image'));

        $slides.first().addClass('current').show();
        $selectors.first().addClass('selected');

        $selectors.click(function() {
            var index = $(this).data('index'); //the index of the selector
            var $nextSlide = $slides.eq(index);
            // don't do anything if same indexed slide already has current class
            if (!$nextSlide.hasClass('current')) {
                $slides.filter('.current').removeClass('current').fadeOut(function() {
                    $selectors.filter('.selected').removeClass('selected')
                    $nextSlide.addClass('current').fadeIn()
                    $selectors.eq(index).addClass('selected');
                });
            }
        });
    });
});

//hover on text makes hover on images (homepage)

$(document).ready(function() {
    $(".highlight-section.mina").mouseenter(function() {
      $(".composition__logo--mina").addClass('highlight-on-hover'); 
    })
    $(".highlight-section.mina").mouseleave(function() {
      $(".composition__logo--mina").removeClass('highlight-on-hover'); 
    })

    $(".highlight-section.figura").mouseenter(function() {
      $(".composition__logo--figura").addClass('highlight-on-hover'); 
    })
    $(".highlight-section.figura").mouseleave(function() {
      $(".composition__logo--figura").removeClass('highlight-on-hover'); 
    })

    $(".highlight-section.macchina").mouseenter(function() {
        $(".composition__logo--macchina").addClass('highlight-on-hover'); 
      })
    $(".highlight-section.macchina").mouseleave(function() {
          $(".composition__logo--macchina").removeClass('highlight-on-hover'); 
    })
});

/**
//menu on homepage positioned inside section. IT BREAKS THE SEARCH TOGGLE
$(document).ready(function() {
    if (location.pathname == "/omeka-s/s/1972_mostra/page/mostra") {
        $("header").prependTo("#intro")
    }
});
*/

//dropdown menu

$(document).ready(function() {
    var timer;
    $("#open-menu > ul > li").each(function(){
        var $menuVoice = $(this);
        if ($menuVoice.find("ul")){
            var $submenu = $menuVoice.children("ul");
            $submenu.addClass('dropdown'); //add class to fix the graphics
            $submenu.hide(); //if there is a submenu hide it
            $(this).mouseover(function() { //show and hide on mouseover
                $submenu.show();
            });
            $(this).mouseout(function() {
                timer = setTimeout(function() {$submenu.hide();} ,5000);
            });

            $submenu.mouseover(function(){
                clearTimeout(timer);
            }, function(){
                $submenu.show();
            });

            $submenu.mouseout(function(){
                $submenu.hide();
                clearTimeout(timer);
            })
        }
    });
});


//sharing

$(document).on('click','.social',function(e){
    if($(this).hasClass('facebook')){
        const url  = 'http://www.facebook.com/sharer.php?u='+$(this).data("url");
        window.open(url,'',"width=500,height=500,left=400px,top=100px,location=no");
    }
    else if($(this).hasClass('twitter')){
        const url  = 'https://twitter.com/intent/tweet?url='+$(this).data("url");
        window.open(url,'',"width=500,height=500,left=400px,top=100px,location=no");
    }
    else if ($(this).hasClass('embed')){
        e.preventDefault();
        embedUrl = $(this).data('url');
        embedTitle = $(this).data('title');
        embedCode = "<iframe src='" + embedUrl + "' title='"+ embedTitle +"'></iframe>";
        alert(embedCode);
    }
});
