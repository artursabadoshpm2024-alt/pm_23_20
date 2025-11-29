document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('name-container');

    const div = document.createElement('div');
    div.classList.add('text-9');
    div.textContent = 'THOMAS';

    const span = document.createElement('span');
    span.classList.add('text-10');
    span.textContent = 'SMITH';

    div.appendChild(span);

    container.appendChild(div);

    const skillsContainer = document.getElementById('skills-container');

    const skills = [
        { name: 'Microsoft Word', value: 70 },
        { name: 'Adobe Illustrator', value: 60 },
        { name: 'Microsoft PowerPoint', value: 80 },
        { name: 'Adobe Photoshop', value: 90 }
    ];

    skills.forEach(skill => {
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

    const header = document.querySelector('.about-me .header');
    const content = document.querySelector('.lg');
    const arrow = header.querySelector('.arrow');

    header.addEventListener('click', function() {
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            arrow.style.transform = 'rotate(0deg)';
        } else {
            content.style.display = 'none';
            arrow.style.transform = 'rotate(270deg)';
        }
    });
});