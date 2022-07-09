score = 0;
count = 0;
cross = true;
m1 = new Audio("gameover.mp3");
m2 = new Audio("music.mp3");
gameOver = false;

//At very First time when you made the game then there is null in local storage so by default there is null value.
hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
  document.getElementById("highest").innerHTML = hiscoreval;
} else {
  hiscoreval = JSON.parse(hiscore);
  document.getElementById("highest").innerHTML = "HighScore: " + hiscore;
}

document.onkeydown = (e) => {
  if (gameOver == false) {
    m2.play();
  }
  //console.log(e.key);
  if (e.key == "ArrowUp") {
    document.querySelector(".dino").classList.add("animateDino");
    setTimeout(() => {
      document.querySelector(".dino").classList.remove("animateDino");
    }, 700);
  }

  if (e.key == "ArrowRight") {
    dno = document.querySelector(".dino");
    dinoX = parseInt(
      window.getComputedStyle(dno, null).getPropertyValue("left")
    );
    dno.style.left = dinoX + 112 + "px";
  }

  if (e.key == "ArrowLeft") {
    dno = document.querySelector(".dino");
    dinoX = parseInt(
      window.getComputedStyle(dno, null).getPropertyValue("left")
    );
    dno.style.left = dinoX - 112 + "px";
  }
};

setInterval(() => {
  dino = document.querySelector(".dino");
  gameover = document.querySelector(".gameover");
  obstacle = document.querySelector(".obstacle");
  dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - oy);

  if (offsetX < 170 && offsetY < 60) {
    document.querySelector(".gameOver").innerHTML = "Game Over";
    obstacle.classList.remove("obstacle");
    m1.play();
    m2.pause();
    gameOver = true;
    setTimeout(() => {
      m1.pause();
    }, 1000);
  } else if (offsetX < 150 && cross) {
    count += 1;
    score += 10;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      document.querySelector("#highest").innerHTML = "HighScore: " + hiscoreval;
    }
    updateScore(score);

    cross = false;

    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      if (count == 6) {
        document.querySelector(".obstacle").style.animationDuration = "2.5s";
      } else if (count < 6) {
        document.querySelector(".obstacle").style.animationDuration =
          aniDur - 0.4 + "s";
      }
    }, 1500);
  }
}, 10);

var updateScore = (s) => {
  document.querySelector("#scoreCont").innerHTML = "Your Score: " + s;
};
