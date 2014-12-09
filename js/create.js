$(document).ready(function() {
    var backgroundColor = "grayscale";
      function update(activeAnchor) {
        var group = activeAnchor.getParent();

        var topLeft = group.find('.topLeft')[0];
        var topRight = group.find('.topRight')[0];
        var bottomRight = group.find('.bottomRight')[0];
        var bottomLeft = group.find('.bottomLeft')[0];
        var image = group.find('.image')[0];

        var anchorX = activeAnchor.x();
        var anchorY = activeAnchor.y();

        // update anchor positions
        switch (activeAnchor.name()) {
          case 'topLeft':
            topRight.y(anchorY);
            bottomLeft.x(anchorX);
            break;
          case 'topRight':
            topLeft.y(anchorY);
            bottomRight.x(anchorX);
            break;
          case 'bottomRight':
            bottomLeft.y(anchorY);
            topRight.x(anchorX); 
            break;
          case 'bottomLeft':
            bottomRight.y(anchorY);
            topLeft.x(anchorX); 
            break;
        }

        var height = bottomLeft.y() - topLeft.y();
        var width = topRight.x() - topLeft.x();
        if(width && height) {
          image.setSize({width:width, height: height});
        }
        
        image.setPosition(topLeft.getPosition());
      }
      function addAnchor(group, x, y, name) {
        var stage = group.getStage();
        var layer = group.getLayer();

        var anchor = new Kinetic.Circle({
          x: x,
          y: y,
          stroke: '#666',
          fill: '#ddd',
          strokeWidth: 2,
          radius: 8,
          name: name,
          draggable: true,
          dragOnTop: false
        });

        anchor.on('dragmove', function() {
          update(this);
          layer.draw();
        });
        anchor.on('mousedown touchstart', function() {
          group.setDraggable(false);
          this.moveToTop();
        });
        anchor.on('dragend', function() {
          group.setDraggable(true);
          layer.draw();
        });
        // add hover styling
        anchor.on('mouseover', function() {
          var layer = this.getLayer();
          document.body.style.cursor = 'pointer';
          this.setStrokeWidth(4);
          layer.draw();
        });
        anchor.on('mouseout', function() {
          var layer = this.getLayer();
          document.body.style.cursor = 'default';
          this.strokeWidth(2);
          layer.draw();
        });

        group.add(anchor);
      }

      function initStage() {
        var stage = new Kinetic.Stage({
          container: 'image-container',
          width: 980,
          height: 640
        });
        var darthVaderGroup = new Kinetic.Group({
          x: 0,
          y: 0,
          draggable: false
        });
        var yodaGroup = new Kinetic.Group({
          x: 10,
          y: 110,
          draggable: true
        });
        var layer = new Kinetic.Layer();

        /*
         * go ahead and add the groups
         * to the layer and the layer to the
         * stage so that the groups have knowledge
         * of its layer and stage
         */
        layer.add(darthVaderGroup);
        layer.add(yodaGroup);
        stage.add(layer);
        
        //addBackground('/dev/annie/jibjab/images/sled.png');

        $('.inserted-section').on('click', '.preview', function() {
            $(this).removeClass('preview').addClass('unpreview');
            $(this).text('Back to edit');
          preview();
        });
        
        $('.inserted-section').on('click', '.unpreview', function() {
            $(this).addClass('preview').removeClass('unpreview');
            $(this).text('Preview');
          unpreview();
        });
        
        $('#finish').on('click', function() {
          finish();
        });
        
        function finish(){
            //$('.kineticjs-content').fadeOut();
            //$('#finished').fadeIn();
            darthVaderGroup.moveToTop();
            yodaGroup.find('.image')[0].opacity(1);
            var backgroundImage = darthVaderGroup.find('.image')[0];
            console.log(backgroundImage.getWidth())
            yodaGroup.find('.image')[0].cache();
            if(backgroundColor === 'sepia') {
                yodaGroup.find('.image')[0].filters([Kinetic.Filters.Sepia]);
            }
            else if(backgroundColor === 'grayscale') {
                yodaGroup.find('.image')[0].filters([Kinetic.Filters.Grayscale]);
            }
            layer.draw();
            stage.toDataURL({
                callback: function(dataUrl) {
                    /*
                     * here you can do anything you like with the data url.
                     * In this tutorial we'll just open the url with the browser
                     * so that you can see the result as an image
                     */
                     finished_img = new Image();
                     finished_img.onload = function() {
                     kImage=new Kinetic.Image({
                        image:finished_img,
                        x:0,
                        y:0,
                        width: backgroundImage.getWidth(),
                        height: backgroundImage.getHeight(),
                        crop: {
                            x: 100,
                            y: 0,
                            width:backgroundImage.getWidth(),
                            height:backgroundImage.getHeight()
                        }
                    });
                    darthVaderGroup.destroy();
                    yodaGroup.destroy();
                    layer.add(kImage);
                    layer.draw();
                    stage.setAttr('width', backgroundImage.getWidth());
                    stage.setAttr('height', backgroundImage.getHeight());
                    stage.toDataURL({
                    callback: function(FdataUrl) {
                        $('#finished').attr('src', FdataUrl);
                    }
                    });
                    }
                    finished_img.src = dataUrl;
                    $('.write-message').fadeIn();
                    $.scrollTo('.write-message', 800);
                }
            });
        }
        
        function preview(){
            darthVaderGroup.find('.preview').show();
            darthVaderGroup.moveToTop();
            yodaGroup.find('.image')[0].opacity(1);
            layer.draw();
        }
        
        function unpreview(){
            darthVaderGroup.find('.preview').hide();
            yodaGroup.moveToTop();
            yodaGroup.find('.image')[0].opacity(0.5);
            layer.draw();
        }

        stage.draw();
        
        function addBackground(src) {
            darthVaderGroup.removeChildren();
            var background = new Image();
            background.onload = function() {
            
            // darth vader
            var darthVaderImg = new Kinetic.Image({
              x: 100,
              y: 0,
              image: background,
              name: 'image'
            });
            darthVaderGroup.add(darthVaderImg);
            layer.draw();
            stage.draw();
            var backgroundImage = darthVaderGroup.find('.image')[0];
            var rect = new Kinetic.Rect({
                x: 0,
                y: 0,
                width: 100,
                height: backgroundImage.getHeight(),
                strokeEnabled: false,
                fill: '#fff',
                name: 'preview'
              });
              var rect2 = new Kinetic.Rect({
                x: backgroundImage.getWidth() + 100,
                y: 0,
                width: 880 - backgroundImage.getWidth(),
                height: backgroundImage.getHeight(),
                strokeEnabled: false,
                fill: '#fff',
                name: 'preview'
              });
              var rect3 = new Kinetic.Rect({
                x: 0,
                y: backgroundImage.getHeight(),
                width: 980,
                height: 600 - backgroundImage.getHeight(),
                strokeEnabled: false,
                fill: '#fff',
                name: 'preview'
              });
              
              darthVaderGroup.add(rect);
              darthVaderGroup.add(rect2);
              darthVaderGroup.add(rect3);
              darthVaderGroup.find('.preview').hide();
            }
            background.src= src;
        }
        
        function addImage(src){
            //$('.insert-section').fadeOut();
            //$('.inserted-section').fadeIn();
            $.scrollTo('.place-face', 800);
            yodaGroup.removeChildren();
            var imageObj = new Image();
            imageObj.setAttribute('crossOrigin', 'anonymous');
            imageObj.onload = function() {
                var yodaImg = new Kinetic.Image({
                  x: 0,
                  y: 0,
                  image: imageObj,
                  opacity: 0.5,
                  name: 'image'
                });
                if(yodaImg.getHeight() > 500) {
    	            newHeight = 500;
    	            newWidth = yodaImg.getWidth() * newHeight / yodaImg.getHeight();
    	            yodaImg.setSize({width:newWidth, height: newHeight});
                }
                yodaGroup.add(yodaImg);
                addAnchor(yodaGroup, 0, 0, 'topLeft');
                addAnchor(yodaGroup, yodaImg.getWidth(), 0, 'topRight');
                addAnchor(yodaGroup, yodaImg.getWidth(), yodaImg.getHeight(), 'bottomRight');
                addAnchor(yodaGroup, 0, yodaImg.getHeight(), 'bottomLeft');
                    
                yodaGroup.on('dragstart', function() {
                    layer.draw();
                    this.moveToTop();
                });
            
                layer.draw();
                stage.draw();
            }  

            imageObj.src = src;
        }
        
        $('.choose-background').on('click', function() {
            $('.choose-background').removeClass('chosen');
            $(this).addClass('chosen');
            $.scrollTo('.insert-face', 800);
            var src = $(this).data('src');
            $('.attribution-link').text($(this).data('attribution'));
            $('.attribution-link').attr('href', $(this).data('link'));
            backgroundColor = $(this).data('color');
            addBackground(src);
        });
      
        $('#file-input').change(function(e) {
      	    var f = document.getElementById('file-input').files[0];
            var name = f.name;
            var url = window.URL;
            var src = url.createObjectURL(f);
      	    addImage(src);
      });
      
      $('#file-online-submit').on('click', function() {
      	var src = $('#file-online').val();
        addImage(src);
    });
    $('#insert-form').on('submit', function (e) {
        e.preventDefault();
    });
  
      }

      //var backgroundImage = '/dev/annie/jibjab/images/sled.png';
      initStage();
      
});