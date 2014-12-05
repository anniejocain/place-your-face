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
          x: 100,
          y: 110,
          opacity: 0.5,
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

        $('#preview').on('click', function() {
          preview();
        });
        
        function preview(){
            //$('.kineticjs-content').fadeOut();
            //$('#finished').fadeIn();
            darthVaderGroup.moveToTop();
            yodaGroup.opacity(1);
            console.log(backgroundColor);
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
                        width: 424,
                        height: 640,
                        crop: {
                            x: 100,
                            y: 0,
                            width:424,
                            height:640
                        }
                    });
                    darthVaderGroup.destroy();
                    yodaGroup.destroy();
                    layer.add(kImage);
                    layer.draw();
                    stage.toDataURL({
                    callback: function(FdataUrl) {
                        $('#finished').attr('src', FdataUrl);
                    }
                    });
                    }
                    finished_img.src = dataUrl;
                }
            });
        }

        stage.draw();
        
        function addBackground(src) {
            var background = new Image();
            background.src= src;
            
            // darth vader
            var darthVaderImg = new Kinetic.Image({
              x: 100,
              y: 0,
              image: background,
              width: 424,
              height: 640,
              name: 'image'
            });
    
            darthVaderGroup.add(darthVaderImg);
            layer.draw();
            stage.draw();
        }
        
        function addImage(src){
            $('.insert-section').fadeOut();
            $('.inserted-section').fadeIn();
            var imageObj = new Image();
            imageObj.setAttribute('crossOrigin', 'anonymous');
            imageObj.onload = function() {
                var yodaImg = new Kinetic.Image({
                  x: 0,
                  y: 0,
                  image: imageObj,
                  //opacity: 0.5,
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
            console.log('clicked');
            var src = $(this).data('src');
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