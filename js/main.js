
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuToggle.classList.toggle('menu-open');
    });


    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuToggle.classList.remove('menu-open');
        });
    });
}


document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const email = form.getAttribute('data-email');
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    const originalClasses = btn.className;


    const name = form.querySelector('input[name="name"]').value.trim();
    const userEmail = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (!name || !userEmail || !message) {
        btn.innerText = 'Por favor completa todos los campos';
        btn.classList.remove('bg-indigo-600', 'hover:bg-indigo-500');
        btn.classList.add('bg-amber-600');
        setTimeout(() => {
            btn.innerText = originalText;
            btn.className = originalClasses;
        }, 2500);
        return;
    }


    const subject = encodeURIComponent(`Propuesta de ${name}`);
    const body = encodeURIComponent(
        `Nombre: ${name}\nEmail: ${userEmail}\n\nMensaje:\n${message}`
    );
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;


    window.location.href = mailtoLink;


    btn.innerText = '¡Abriendo correo!';
    btn.classList.remove('bg-indigo-600', 'hover:bg-indigo-500');
    btn.classList.add('bg-emerald-600');
    form.reset();

    setTimeout(() => {
        btn.innerText = originalText;
        btn.className = originalClasses;
    }, 2500);
});


const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('transition-all', 'duration-1000', 'transform', 'translate-y-10', 'opacity-0');
    observer.observe(section);
});
