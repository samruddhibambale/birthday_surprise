/* ==========================================================
   PART 1 - MAIN CONTROLLER
========================================================== */

// ==========================
// PAGES
// ==========================

const pages = document.querySelectorAll(".page");

const gift = document.getElementById("giftBox");
const giftButton = document.getElementById("giftButton");

const music = document.getElementById("music");
const romanticMusic = document.getElementById("romanticMusic");

// ==========================
// OPEN GIFT
// ==========================

function openGift(){

    gift.classList.add("openGift");

    music.play().catch(()=>{});

    confetti({
        particleCount:250,
        spread:180,
        origin:{y:0.6}
    });

    setTimeout(()=>{

        pages[0].classList.remove("active");
        pages[1].classList.add("active");

    },1500);

}

gift.addEventListener("click",openGift);
giftButton.addEventListener("click",openGift);

// ==========================
// PAGE NAVIGATION
// ==========================

function nextPage(page){

    pages.forEach(p=>p.classList.remove("active"));

    document.getElementById("page"+page).classList.add("active");

    confetti({
        particleCount:120,
        spread:100,
        origin:{y:0.6}
    });

    if(page===3){
        startTyping();
    }

    if(page===4){
        animateReasons();
    }

    if(page===5){
        animateGallery();
    }

}

// ==========================
// FLOATING HEARTS
// ==========================

setInterval(()=>{

    const heart=document.createElement("div");

    heart.className="heart";
    heart.innerHTML="❤️";

    heart.style.left=Math.random()*100+"vw";

    heart.style.animationDuration=
    (4+Math.random()*5)+"s";

    document.body.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },9000);

},700);

// ==========================
// SPARKLES
// ==========================

setInterval(()=>{

    const sparkle=document.createElement("div");

    sparkle.className="sparkle";
    sparkle.innerHTML="✨";

    sparkle.style.left=Math.random()*100+"vw";

    sparkle.style.animationDuration=
    (4+Math.random()*5)+"s";

    document.body.appendChild(sparkle);

    setTimeout(()=>{
        sparkle.remove();
    },9000);

},1200);

// ==========================
// TYPEWRITER MESSAGE
// ==========================

const birthdayMessage=`

Dear Shubham ❤️,

Happy Birthday to one of the most amazing people in my life.

Thank you for always standing beside me through every happy moment and every difficult one.

Whenever life becomes complicated, your presence somehow makes everything feel easier, lighter and calmer.

Your kindness, patience and support mean more than words can ever express.

I truly feel lucky to have someone like you in my life.

On your special day, I pray that God blesses you with:

❤️ Endless Happiness

💪 Good Health

💰 Great Success

🌸 Peace

🌈 Beautiful Memories

✨ Everything your heart wishes for.

Keep smiling.

Keep shining.

Never stop being the wonderful person you are.

Happy Birthday once again.

With Lots Of Love,

❤️ BABU ❤️

`;

function startTyping(){

    const box=document.getElementById("typewriter");

    const nextBtn=
    document.getElementById("messageNextBtn");

    box.innerHTML="";
    nextBtn.style.display="none";

    let i=0;

    const timer=setInterval(()=>{

        box.innerHTML+=birthdayMessage.charAt(i);

        i++;

        if(i>=birthdayMessage.length){

            clearInterval(timer);

            nextBtn.style.display="inline-block";

        }

    },28);

}

// ==========================
// WHY YOU'RE SPECIAL
// ==========================

function animateReasons(){

    const cards=
    document.querySelectorAll(".reason-card");

    cards.forEach((card,index)=>{

        setTimeout(()=>{

            card.classList.add("show");

        },index*250);

    });

}

// ==========================
// GALLERY
// ==========================

function animateGallery(){

    const photos=document.querySelectorAll(".photo");

    photos.forEach((photo,index)=>{

        photo.style.opacity="0";
        photo.style.transform="translateY(40px)";

        setTimeout(()=>{

            photo.style.transition=".7s";
            photo.style.opacity="1";
            photo.style.transform="translateY(0)";

        },index*250);

    });

}

// ==========================
// IMAGE MODAL
// ==========================

function openImage(src){

    document.getElementById("imageModal").style.display="flex";

    document.getElementById("modalImage").src=src;

}

function closeImage(){

    document.getElementById("imageModal").style.display="none";

}
/* ==========================================================
   PART 2 - NETFLIX INTRO + VIDEO PAGE
========================================================== */

// ==========================
// NETFLIX INTRO
// ==========================

function startNetflixIntro(){

    nextPage(7);

    const text=document.getElementById("introText");

    const messages=[

        "One Last Thing...",

        "A Special Surprise Awaits ❤️",

        "Happy Birthday",

        "SHUBHAM ❤️",

        "3",

        "2",

        "1"

    ];

    let current=0;

    function showNextMessage(){

        text.classList.remove("fadeIn");
        text.classList.add("fadeOut");

        setTimeout(()=>{

            text.innerHTML=messages[current];

            text.classList.remove("fadeOut");
            text.classList.add("fadeIn");

            current++;

            if(current<messages.length){

                setTimeout(showNextMessage,1300);

            }else{

                setTimeout(showVideoPage,1800);

            }

        },500);

    }

    showNextMessage();

}

// ==========================
// VIDEO PAGE
// ==========================

function showVideoPage(){

    nextPage(8);

    // Stop Birthday Music

    music.pause();

    music.currentTime=0;

    // Huge Confetti Blast

    megaConfetti();

    // Play Video

    const video=document.getElementById("birthdayVideo");

    if(video){

        video.load();

        const playPromise=video.play();

        if(playPromise!==undefined){

            playPromise.catch(()=>{

                console.log("Autoplay blocked by browser.");

            });

        }

    }

}

// ==========================
// MEGA CONFETTI
// ==========================

function megaConfetti(){

    const duration=7000;

    const end=Date.now()+duration;

    (function frame(){

        confetti({

            particleCount:8,

            angle:60,

            spread:60,

            origin:{x:0}

        });

        confetti({

            particleCount:8,

            angle:120,

            spread:60,

            origin:{x:1}

        });

        confetti({

            particleCount:5,

            spread:360,

            startVelocity:45,

            ticks:200,

            origin:{

                x:Math.random(),

                y:Math.random()-0.2

            }

        });

        if(Date.now()<end){

            requestAnimationFrame(frame);

        }

    })();

}

// ==========================
// VIDEO ENDED
// ==========================

const birthdayVideo=document.getElementById("birthdayVideo");

if(birthdayVideo){

    birthdayVideo.onended=function(){

        confetti({

            particleCount:250,

            spread:180,

            origin:{y:.6}

        });

    }

}

// ==========================
// NEXT SURPRISE BUTTON
// ==========================

function goToProposal(){

    const video=document.getElementById("birthdayVideo");

    if(video){

        video.pause();

    }

    nextPage(9);

}

// ==========================
// OPTIONAL SKIP BUTTON
// ==========================

function skipVideo(){

    const video=document.getElementById("birthdayVideo");

    if(video){

        video.pause();

    }

    nextPage(9);

}
/* ==========================================================
   PART 3 - PROPOSAL + GRAND FINALE
========================================================== */

// ==========================
// NO BUTTON
// ==========================

let noCount = 0;

function moveNoButton(){

    const noBtn = document.getElementById("noBtn");

    noCount++;

    if(noCount < 8){

        noBtn.style.position = "absolute";

        noBtn.style.left = (Math.random()*70+10)+"%";

        noBtn.style.top = (Math.random()*60+20)+"%";

    }

    else{

        noBtn.innerHTML="😂 Nice Try";

        noBtn.style.transform="scale(.9)";

    }

}

// ==========================
// YES BUTTON
// ==========================

function yesClicked(){

    // Stop birthday music

    music.pause();

    music.currentTime = 0;

    // Romantic music

    romanticMusic.play().catch(()=>{});

    // Massive Confetti

    megaConfetti();

    // Hearts

    heartExplosion();

    // Roses

    roseRain();

    // Open final page

    setTimeout(()=>{

        startFutureLoading();

    },3000);

}

// ==========================
// HEART EXPLOSION
// ==========================

function heartExplosion(){

    for(let i=0;i<250;i++){

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML="❤️";

        heart.style.left=Math.random()*100+"vw";

        heart.style.top=Math.random()*100+"vh";

        heart.style.fontSize=(20+Math.random()*35)+"px";

        heart.style.animationDuration=(3+Math.random()*4)+"s";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },7000);

    }

}

// ==========================
// ROSE RAIN
// ==========================

let roseInterval;

function roseRain(){

    roseInterval=setInterval(()=>{

        const rose=document.createElement("div");

        rose.className="heart";

        rose.innerHTML="🌹";

        rose.style.left=Math.random()*100+"vw";

        rose.style.fontSize=(22+Math.random()*18)+"px";

        rose.style.animationDuration=(4+Math.random()*4)+"s";

        document.body.appendChild(rose);

        setTimeout(()=>{

            rose.remove();

        },8000);

    },250);

}

// ==========================
// FUTURE LOADING
// ==========================

function startFutureLoading(){

    nextPage(11);

    let progress=0;

    const bar=document.getElementById("progressFill");

    const text=document.getElementById("progressText");

    const timer=setInterval(()=>{

        progress++;

        bar.style.width=progress+"%";

        text.innerHTML=progress+"%";

        if(progress>=100){

            clearInterval(timer);

            clearInterval(roseInterval);

            document.getElementById("loadingContainer").style.display="none";

            document.getElementById("finalMessage").style.display="block";

            megaConfetti();

        }

    },45);

}

// ==========================
// EXTRA CONFETTI EVERY PAGE
// ==========================

window.addEventListener("load",()=>{

    confetti({

        particleCount:150,

        spread:150,

        origin:{y:.6}

    });

});

// ==========================
// RESPONSIVE VIDEO
// ==========================

window.addEventListener("resize",()=>{

    const video=document.getElementById("birthdayVideo");

    if(video){

        video.style.width="100%";

    }

});

// ==========================
// AUTO PAUSE VIDEO WHEN LEAVING
// ==========================

document.addEventListener("visibilitychange",()=>{

    const video=document.getElementById("birthdayVideo");

    if(video && document.hidden){

        video.pause();

    }

});

// ==========================
// END OF SCRIPT
// ==========================
console.log("❤️ Birthday Website Loaded Successfully ❤️");

