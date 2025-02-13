const navHeight = document.querySelector("nav").offsetHeight;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".skill-card, .project-card").forEach((el) => {
  el.classList.add("opacity-0", "translate-y-20");
  observer.observe(el);
});

document.querySelectorAll('.skill-item').forEach((item) => {
    item.addEventListener('mouseover', () => {
      item.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.15)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.boxShadow = '0px 5px 10px rgba(0, 0, 0, 0.10)';
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const androidIcons = document.querySelectorAll('.android-icon');
    
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      androidIcons.forEach(icon => {
        const rect = icon.getBoundingClientRect();
        const iconX = rect.left + rect.width/2;
        const iconY = rect.top + rect.height/2;
        
        const deltaX = mouseX - iconX;
        const deltaY = mouseY - iconY;
        
        icon.style.transform = `translate(${deltaX * 0.02}px, ${deltaY * 0.02}px)`;
      });
    });
  });

   // Handle form submission
   const form = document.getElementById('contact-form');
   const successMessage = document.getElementById('success-message');

   form.addEventListener('submit', async (e) => {
       e.preventDefault();
       
       try {
           const response = await fetch(form.action, {
               method: 'POST',
               body: new FormData(form),
               headers: {
                   'Accept': 'application/json'
               }
           });
           
           if (response.ok) {
               successMessage.classList.remove('hidden');
               form.reset();
               setTimeout(() => {
                   successMessage.classList.add('hidden');
               }, 5000);
           }
       } catch (error) {
           console.error('Error:', error);
       }
   });