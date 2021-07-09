// Mouse circle
const mouseCircle = document.querySelector('.mouse-circle')
const mouseDot = document.querySelector('.mouse-dot')

const mouseCircleFn = (x, y) => {
    mouseCircle.style.cssText = `top:${y}px; left:${x}px; opacity: 1`;
    mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
};
// End of Mouse circle

// Animated circles
const circles = document.querySelectorAll('.circle')
const mainImg = document.querySelector(".main-circle img")

let mX = 0;
let mY = 0;
const z = 50;

const animatedCircles = (e, x, y)=> {
    if (x < mX) {
        circles.forEach(circle => {
            circle.style.left = `${z}px`;
        })
    } else if (x > mX) {
        circles.forEach(circle => {
            circle.style.left = `-${z}px`;
        })
    }

    if (y < mY) {
        circles.forEach(circle => {
            circle.style.top = `${z}px`;
        })
    } else if (y > mY) {
        circles.forEach(circle => {
            circle.style.top = `-${z}px`;
        })
    }

    mX = e.clientX;
    mY = e.clientY;
};
// End of Animated circles

document.body.addEventListener("mousemove", (e)=> {
    let x = e.clientX;
    let y = e.clientY;

    mouseCircleFn(x, y);
    animatedCircles(e, x, y)
});

document.addEventListener('mouseleave', ()=> {
    mouseCircle.style.opacity = '0';
    mouseDot.style.opacity = '0';
});

// Main button
const mainBtns = document.querySelectorAll('.main-btn')

mainBtns.forEach(btn => {
    let ripple;

    btn.addEventListener('mouseenter', (e)=> {
        const left = e.clientX - e.target.getBoundingClientRect().left;
        const top = e.clientY - e.target.getBoundingClientRect().top;

        ripple = document.createElement('div')
        ripple.classList.add('ripple');
        ripple.style.left = `${left}px`;
        ripple.style.top = `${top}px`;
        btn.prepend(ripple);
    });

    btn.addEventListener('mouseleave', ()=> {
        btn.removeChild(ripple);
    });
});
// End of Main button

// Navigation
const menuIcon = document.querySelector('.menu-icon');
const navBar = document.querySelector('.navbar');

document.addEventListener('scroll', ()=> {
    menuIcon.classList.add('show-menu-icon');
    navBar.classList.add('hide-navbar');

    if (window.scrollY === 0) {
        menuIcon.classList.remove('show-menu-icon');
        navBar.classList.remove('hide-navbar');
    }
});

menuIcon.addEventListener('click', ()=> {
    menuIcon.classList.remove('show-menu-icon');
    navBar.classList.remove('hide-navbar');
});
// End of Navigation

// About me text
const aboutMeText = document.querySelector('.about-me-text')
const aboutMeTextContent = "Hi, my name is Alison and I'm full stack developer. Specialized in WEB and Mobile applications aiming for the best user experience. Thank you for visiting my Portfolio!";

Array.from(aboutMeTextContent).forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    aboutMeText.appendChild(span);

    span.addEventListener('mouseenter', (e)=> {
        e.target.style.animation = "aboutMeTextAnim 10s infinite";
    });
});
// End of About me text

// Projects
const container = document.querySelector('.container');
const projects = document.querySelectorAll('.project');
const projectHideBtn = document.querySelector('.project-hide-btn ');

projects.forEach((project, i)=> {
    project.addEventListener("mouseenter", ()=> {
        project.firstElementChild.style.top = `-${
            project.firstElementChild.offsetHeight - project.offsetHeight + 20
        }px`;
    });

    project.addEventListener("mouseleave", ()=> {
        project.firstElementChild.style.top = "2rem";
    });

    // Big project Image
        project.addEventListener("click", ()=> {
            const bigImgWrapper = document.createElement("div");
            bigImgWrapper.className = "project-img-wrapper";
            container.appendChild(bigImgWrapper);

            const bigImg = document.createElement("img");
            bigImg.className = "project-img";

            const imgPath = project.firstElementChild.getAttribute('src').split(".")[0];
            bigImg.setAttribute("src", `${imgPath}-big.jpg`);
            bigImgWrapper.appendChild(bigImg);
            document.body.style.overflowY = "hidden";

            projectHideBtn.classList.add("change");
            projectHideBtn.onclick = ()=> {
                projectHideBtn.classList.remove("change");
                bigImgWrapper.remove();
                document.body.style.overflowY = "scroll";
            }
        })
    // End if Big project Image

    i >= 6 && (project.style.cssText = "display:none; opacity: 0;");
});

// Projects button
const section3 = document.querySelector('.section-3');
const projectsBtn = document.querySelector(".projects-btn");
const projectsBtnText = document.querySelector(".projects-btn span");
let showHideBool = true;

const showProjects = (project, i)=> {
    setTimeout(()=> {
        project.style.display = "flex";
        section3.scrollIntoView({block: "end"});
    }, 600);

    setTimeout(()=> {
        project.style.opacity = "1";
    }, i * 200);
};

const hideProjects = (project, i)=> {
    setTimeout(()=> {
        project.style.display = "none";
        section3.scrollIntoView({block: "end"});
    }, 1200);
    
    setTimeout(()=> {
        project.style.opacity = "0";
    }, i * 100);
};

projectsBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");

    showHideBool ? (projectsBtnText.textContent = "Show Less"): projectsBtnText.textContent = "Show More"; 

    projects.forEach((project, i)=> {
        i >= 6 && (showHideBool ? showProjects(project, i) : hideProjects(project, i))
    });
    showHideBool = !showHideBool;
});
// End of Projects button
// End of Projects

// Section 4
document.querySelectorAll(".service-btn").forEach((service)=> {
    service.addEventListener('click', (e)=> {
        e.preventDefault();

        const serviceText = service.nextElementSibling;
        serviceText.classList.toggle("change");

        const rightPosition = serviceText.classList.contains("change") ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})` : 0;

        service.firstElementChild.style.right = rightPosition;
    });
});
// End of Section 4

// Section 5
// Form
const formHeading = document.querySelector('.form-heading');
const formInputs = document.querySelectorAll('.contact-form-input');

formInputs.forEach((input)=> {
    input.addEventListener('focus', ()=> {
        formHeading.style.opacity = "0";
        setTimeout(()=> {
            formHeading.textContent = `Your ${input.placeholder}`;
            formHeading.style.opacity = "1";
        }, 300);
    });

    input.addEventListener('blur', ()=> {
        formHeading.style.opacity = "0";
        setTimeout(()=> {
            formHeading.textContent = `Let's Talk`;
            formHeading.style.opacity = "1";
        }, 300);
    });
});
// End of Form

// Slideshow
const slideshow = document.querySelector('.slideshow');

setInterval(() => {
    const firstIcon = slideshow.firstElementChild;
    firstIcon.classList.add('faded-out');

    const thirdIcon = slideshow.children[3];
    thirdIcon.classList.add('light');
    thirdIcon.previousElementSibling.classList.remove('light');

    setTimeout(() => {
        slideshow.removeChild(firstIcon);
        slideshow.appendChild(firstIcon);

        setTimeout(() => {
            firstIcon.classList.remove('faded-out');
        }, 500);
    }, 500);
}, 3000);
// End of Slideshow

// Form validation
const form = document.querySelector('.contact-form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const messages = document.querySelectorAll('.message');

const error = (input, message)=> {
    input.nextElementSibling.classList.add('error');
    input.nextElementSibling.textContent = message;
};

const sucess = (input)=> {
    input.nextElementSibling.classList.remove('error');
};

const checkRequiredFields = (inputArr)=> {
    inputArr.forEach((input)=> {
        if (input.value.trim() === "") {
            error(input, `${input.id} is required`);
        }
    });
};

const checkLength = (input, min)=> {
    if (input.value.trim().length < min) {
        error(input, `${input.id} must be at least ${min} characters`);
    } else {
        sucess(input);
    }
};

const checkEmail = (input)=> {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regEx.test(input.value.trim())) {
        sucess(input);
    } else {
        error(input, `Email is not valid`);
    }
};

form.addEventListener("submit", (e)=> {
    checkLength(username, 5);
    checkLength(subject, 5);
    checkLength(message, 10);
    checkEmail(email);
    checkRequiredFields([username, email, subject, message]);

    const notValid = Array.from(messages).find((message)=> {
        return message.classList.contains("error");
    });

    notValid && e.preventDefault();
});
// End of Form validation
// End of Section 5