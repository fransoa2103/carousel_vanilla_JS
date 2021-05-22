//
    // INIT
//
let direction   = 'left';
let play        = 0;
oneSlideLeft    = document.querySelector('.oneSlideLeft');
oneSlideRight   = document.querySelector('.oneSlideRight');
playLeft        = document.querySelector('.playLeft');
playRight       = document.querySelector('.playRight');
carousel        = document.querySelector('.carousel');
const tabImg    = ['Ville_1.jpg', 'Ville_2.jpg', 'Ville_3.jpg', 'Ville_4.jpg', 'Ville_5.jpg'];
const totalImg  = tabImg.length;
// tabImg          = ['http://placeimg.com/300/300/animals', 'http://placeimg.com/300/300/arch', 'http://placeimg.com/300/300/nature', 'http://placeimg.com/300/300/people', 'http://placeimg.com/300/300/tech'];


//
    // ON LOAD
//
// ----------------------------------------------------------------------------- //
// As the photos are loaded in JS, window.onload run carousel 1st display
// ----------------------------------------------------------------------------- //
window.onload = ()=>
{
    for (i = 0; i < totalImg ; i++)
    {
        let newDiv = document.createElement('div');
        carousel.appendChild(newDiv);
        newDiv.innerHTML=`<img src="${tabImg[i]}">`;
    }
    boxCarousel = Array.from(document.querySelectorAll('.carousel>div'));
};

//
    // FUNCTIONS
//
// ----------------------------------------------------------------------------- //
// function slideLeft() and function slideRight()
// 
// (1) on start tabImg = [pic1 pic2 pic3 pic4 pic5]
// (2) on click arrow Right run function slideRight()
// (3) then tabImg = [pic5 pic1 pic2 pic3 pic4 pic5]
// (4) pop tabImg so tabImg result = [pic5 pic1 pic2 pic3 pic4]
// reverse process on click Left.
// ----------------------------------------------------------------------------- //
function slideLeft()
    {   
        tabImg.push(tabImg[0]);
        tabImg.shift();
    };
function slideRight()
    {   
        tabImg.unshift(tabImg[totalImg-1]);
        tabImg.pop();
    };

// ----------------------------------------------------------------------------- //
// function called 'animation' always run before slideLeft() and slideRight().
// ----------------------------------------------------------------------------- //
function animation(direction)
    {   
        for (i = 0; i < totalImg; i++)
        {
            boxCarousel[i].innerHTML=`<img src="${tabImg[i]}" class="active${direction}">`;
        }
    };

// ----------------------------------------------------------------------------- //
// function autoplay left (play =1) and right (play=2) called 'animSetInterval'.
// ----------------------------------------------------------------------------- //
function animSetInterval()
    {   if (play == 1)
        {
            animation('Left');
            slideLeft();
        }
        else
        {
            animation('Right');
            slideRight();
        }
    };


//
    // EVENTS
//
// ----------------------------------------------------------------------------- //
// on click left or right arrow, animation is run one picture by one.
// en cliquant sur une des flèches le slide ne varie que d'une photo à la fois.
// ----------------------------------------------------------------------------- //
oneSlideRight.addEventListener('click', ()=>
    {
        if (play == 0)
        {
            animation('Left');
            slideLeft();
        }
    });

oneSlideLeft.addEventListener('click', ()=>
    {
        if (play == 0)
        {
            animation('Right');
            slideRight();
        }
    });

// ----------------------------------------------------------------------------- //
// autoplay right or left / défilement automatique vers la droite ou la gauche
// during autoplay you cant click on other arrow
// pendant le défilement automatique vous ne pouve pas cliquer sur une autre flèche
// play = 0 > stop - play = 1 > autoplay left - play = 2 > autoplay right
// ----------------------------------------------------------------------------- //

playRight.addEventListener('click', ()=>
    {   if (play == 0)
        { 
            play = 1;
            animSetInterval(); 
            anim = setInterval(() => { animSetInterval() }, 1500);
            playRight.innerHTML         = '<h1>&#9632</h1>';
            oneSlideLeft.style.cursor   = 'default';
            oneSlideRight.style.cursor  = 'default';
            playLeft.style.display      = 'none';  
        }
        else
        {   if (play == 1)
            {
                clearInterval(anim);
                play = 0;
                playRight.innerHTML         = "<h1>&#8608</h1>";
                oneSlideLeft.style.cursor   = 'pointer';
                oneSlideRight.style.cursor  = 'pointer';
                playLeft.style.display      = 'block';  

            }
        }
    });

playLeft.addEventListener('click', ()=>
    {
        if (play == 0)
        { 
            play = 2;
            anim = setInterval(() => { animSetInterval() }, 1500);
            animSetInterval(); 
            playLeft.innerHTML          = '<h1>&#9632</h1>';
            oneSlideLeft.style.cursor   = 'default';
            oneSlideRight.style.cursor  = 'default';
            playRight.style.display     = 'none';    
        }
            else
        {
            if  (play == 2)
            {
                playLeft.innerHTML = '<h1>&#8606</h1>';
                oneSlideLeft.style.cursor   = 'pointer';
                oneSlideRight.style.cursor  = 'pointer';
                playRight.style.display      = 'block';     
                play = 0;
                clearInterval(anim);
            }
        }
    });

    //
        // I NEED YOUR HELP TO IMPROVE THIS CODE.
        // Je suis à l'écoute de toute votre aide pour améliorer mon code.
        // MERCI THANX.
    //