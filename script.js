$(document).ready(function(){

    var size = 4;
    var array = new Array(size);
    var score = 0;
    var idCell = 0;
    var idRow = 0;


    function initArray(size)
    {
      for (var i = 0; i < size; i++) {
        array[i] = new Array(size);
        for (var j = 0; j < size; j++) {
          array[i][j] = 0;
        }
      }
      return array;
    }

    function printArray()
    {
     var htmlTab = '<table>';
  
     for (var i = 0; i < size; i++)
       {
       htmlTab += '<tr class="row">';
       for (var j = 0; j < size; j++)
         {
           if (array[i][j] == 0)
             htmlTab += '<td class="cell" id=' + idCell + '></td>';
           else
             htmlTab += '<td class="cell" id=' + idCell + '>' + array[i][j] + '</td>';
         idCell++;
         }
       htmlTab += '</tr>';
       idRow++;
     }
     htmlTab += '</table>';
     $('body').append(htmlTab);
    }

    function updateArray()
    {
      for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
          id = calculID(j, i);
  
          switch (array[i][j]) {
            case 0:
            $('#' + id).text(array[i][j]).css("background-color"," #cdc1b4");
            break;
            case 2:
            $('#' + id).text(array[i][j]).css("background-color"," #eee4da");
            break;
            case 4:
            $('#' + id).text(array[i][j]).css("background-color"," #ede0c8");
            break;
            case 8:
            $('#' + id).text(array[i][j]).css("background-color"," #f2b179");
            break;
            case 16:
            $('#' + id).text(array[i][j]).css("background-color"," #f59563");
            break;
            case 32:
            $('#' + id).text(array[i][j]).css("background-color"," #f67c5f");
            break;
            case 64:
            $('#' + id).text(array[i][j]).css("background-color"," #f65e3b");
            break;
            case 128:
            $('#' + id).text(array[i][j]).css("background-color"," #edcf72");
            break;
            case 256:
            $('#' + id).text(array[i][j]).css("background-color"," #edcc61");
            break;
            case 512:
            $('#' + id).text(array[i][j]).css("background-color","#edc850");
            break;
            case 1024:
            $('#' + id).text(array[i][j]).css("background-color"," #edc53f");
            break;
            case 2048:
            $('#' + id).text(array[i][j]).css("background-color"," #e8ba22");
            break;
  }
          if ($('#' + id).text() == "0") {
            $('#' + id).css("visibility", "hidden");
          }
          else {
            $('#' + id).css("visibility", "");
          }
        }
      }
    }
  
    function calculID(x, y)
    {
      return (y * 4 + x);
    }

    function random()
     {
       var randomRow = Math.floor(Math.random() * 4);
       var randomCell = Math.floor(Math.random() * 4);
       var randNumber = Math.floor(Math.random() * 8); //calcul un nombre aléatoire entre 1 et 8
  
       if (array[randomRow][randomCell] == 0) {
         if (randNumber == 1) {
           array[randomRow][randomCell] = 4;
         }
         else {
           array[randomRow][randomCell] = 2;
         }
       }
       else if (array[randomRow][randomCell] != 0)
       {
         random(); 
       }
     }

     function moveRight()
     {
       for (var i = 0; i <= size-1; i++)
       {
         for (var j = 0; j <= size-1; j++)
         {
           if (array[i][j] == array[i][j+1] && array[i][j+1] != 0)
           {
             array[i][j+1] += array[i][j];
             array[i][j] = 0;
             score += array[i][j+1];
             $('.score').text(score);
           }
           else if (array[i][j+1] === 0)
           {
             array[i][j+1] = array[i][j];
             array[i][j] = 0;
           }
         }
       }
       random();
     }
  
     function moveLeft()
     {
       var mergeDone = false;
       for (var i = size-1; i >= 0; i--)
       {
         for (var j = size-1; j >= 0; j--)
         {
            if (array[i][j] == array[i][j-1] && array[i][j-1] != 0 && mergeDone == false)
               {
                 array[i][j-1] += array[i][j];
                 array[i][j] = 0;
                 score += array[i][j-1];
                 $('.score').text(score);
                 mergeDone = true;
               }
             else if (array[i][j-1] == 0)
             {
               array[i][j-1] = array[i][j];
               array[i][j] = 0;
             }
         }
       }
       random();
     }
  
     function moveTop()
     {
       for (var j = size-1; j >= 0; j--)
       {
         for (var i = size-1; i >= 0; i--)
         {
           if (i == 0) {
             continue;
           }
           if (array[i][j] == array[i-1][j] && array[i-1][j] != 0)
           {
             array[i-1][j] += array[i][j];
             array[i][j] = 0;
             score += array[i-1][j];
             $('.score').text(score);
           }
           else if (array[i-1][j] == 0)
           {
             array[i-1][j] = array[i][j];
             array[i][j] = 0;
           }
         }
       }
       random();
     }
  
     function moveBottom()
     {
       for (var j = 0; j <= size-1; j++)
       {
         for (var i = 0; i <= size-1; i++)
          {
            if (i == size-1) {
              continue;
            }
           if (array[i][j] == array[i+1][j] && array[i+1][j] != 0)
           {
             array[i+1][j] += array[i][j];
             array[i][j] = 0;
             score += array[i+1][j];
             $('.score').text(score);
           }
           else if (array[i+1][j] == 0) {
             array[i+1][j] = array[i][j];
             array[i][j] = 0;
           }
         }
       }
       random();
     }
  
     $(document).keydown(function(e)
     {
       var keyCode = e.keyCode || e.which,
       arrow = {left: 37, up: 38, right: 39, down: 40 };
  
       switch (keyCode) {
  
         case arrow.left:
         moveLeft();
         updateArray();
         break;
  
         case arrow.up:
         moveTop();
         updateArray();
         break;
  
         case arrow.right:
         moveRight();
         updateArray();
         break;
  
         case arrow.down:
         moveBottom();
         updateArray();
         break;
       }
     });
  
     function newGame()
     {
       score = 0;
       $('.score').text(score);
       initArray(size)
       random();
       random();
       updateArray();
     }
  
     $('.newGame').click(function(){
       newGame();
     });
  

    printArray(initArray(size));
});
