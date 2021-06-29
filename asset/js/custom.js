$(document).ready(function() {

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
    var titles = $('.scheda_link');
    titles.each(function(){
        $('.mono_link').append("<a href='#"+$(this).attr('id')+"'> "+$(this).text()+"</a>")
    });
});

//slider

$(document).ready(function(){

    $('.slider').each(function(){
        $slider = $(this);
        var $slider_block = $slider.find($('.slider-block'));
        $slider_block.append('<div class="pagination-slider"></div>') //add the div for the pagination

        var titles_pagination = $slider.find($('.slider-title'));
        titles_pagination.each(function(){
            $slider.find($('.pagination-slider')).append('<div class="select-image" alt="go to image">'+$(this).text()+"</div>") //gets the titles and relative urls to the slider items
        });

        $slider.find($('.imageslide')).first().addClass('current').show();
        $slider.find($('.select-image')).first().addClass('selected');
        
        $slider.find($('.imageslide')).each(function( i, el ){ //add a numbered id for each figure
            $(el).attr('id','image-num-'+i);
        });

        var $slides = $slider.find($('.imageslide')); 

        $slider.find($('.select-image')).click(function() {
            var index = $(this).index(); //the index of the selector
            var $nextSlide = $slides.eq(index);
            // don't do anything if same indexed slide already has current class
            if (!$nextSlide.hasClass('current')) {
                $slides.filter('.current').removeClass('current').fadeOut(function() {
                $('.select-image').filter('.selected').removeClass('selected')
                $nextSlide.addClass('current').fadeIn()
                $('.select-image').eq(index).addClass('selected');
            });
            }
        });
    });
});