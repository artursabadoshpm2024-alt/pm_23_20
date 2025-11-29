document.addEventListener('DOMContentLoaded', function() {
    fetch('json/data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('name-container');
            const div = document.createElement('div');
            div.classList.add('text-9');
            div.textContent = data.name.first || '';

            const span = document.createElement('span');
            span.classList.add('text-10');
            span.textContent = data.name.last || '';

            div.appendChild(span);
            container.appendChild(div);

            const skillsContainer = document.getElementById('skills-container');
            if (data.skills && Array.isArray(data.skills)) {
                data.skills.forEach(skill => {
                    const skillItem = document.createElement('div');
                    skillItem.classList.add('skill-item');

                    const leftDiv = document.createElement('div');
                    leftDiv.classList.add('left-3');

                    const dot = document.createElement('div');
                    dot.classList.add('dot');

                    const label = document.createElement('label');
                    label.classList.add('text-6');
                    label.textContent = skill.name;

                    leftDiv.appendChild(dot);
                    leftDiv.appendChild(label);
                    skillItem.appendChild(leftDiv);

                    const input = document.createElement('input');
                    input.type = 'range';
                    input.classList.add('slider');
                    input.value = skill.value;
                    input.disabled = true;

                    const percentage = skill.value;
                    input.style.background = `linear-gradient(to right, #f4cdff ${percentage}%, #ce4ff2 ${percentage}%)`;

                    skillItem.appendChild(input);
                    skillsContainer.appendChild(skillItem);
                });
            }

            // About Me
            const content = document.querySelector('.lg');
            if (data.aboutMe && Array.isArray(data.aboutMe)) {
                data.aboutMe.forEach(text => {
                    const p = document.createElement('p');
                    p.classList.add('text-8');
                    p.innerHTML = text.replace(/\n/g, '<br>');
                    content.appendChild(p);
                });
            }
        })
        .catch(err => console.error('Error loading JSON:', err));

    const header = document.querySelector('.about-me .header');
    const contentDiv = document.querySelector('.lg');
    const arrow = header.querySelector('.arrow');

    header.addEventListener('click', function() {
        if (contentDiv.style.display === 'none' || contentDiv.style.display === '') {
            contentDiv.style.display = 'block';
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        } else {
            contentDiv.style.display = 'none';
            if (arrow) arrow.style.transform = 'rotate(270deg)';
        }
    });
});
