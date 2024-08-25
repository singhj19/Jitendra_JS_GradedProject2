// Sample resume data
let resumeData = [];
const resumesPerPage = 1;
let filteredResumes = [];
let currentPage = 1;

// DOM Elements
const resumeContainer = document.getElementById('bottom-right');
const searchInput = document.getElementById('search-Input');
const prevBtn = document.getElementById('prev-Btn');
const nextBtn = document.getElementById('next-Btn');

// Load resumes data
const loadResumes = async () => {
    try {
        const response = await fetch('data1.json');
        const data = await response.json();
        resumeData = data.resume;
        paginateResumes();
    } catch (error) {
        console.error('Error loading resumes:', error);
    }
};

// Display resume details
const displayResume = (resume) => {
    document.getElementById('resume-card').style.maxHeight = '';
    document.getElementById('resume-card').style.maxWidth ='';
    document.getElementById('resume-card').style.marginTop = '';

    document.getElementById('top-Section').innerHTML = `
        <div class="part1" style="flex: 1; display: flex; flex-direction: column; align-items: center;">
            <p>${resume.basics.name}</p>
            <p>Applied For: ${resume.basics.AppliedFor}</p>            
        </div>
        <i class="fa-solid fa-user" style="font-size: 48px; color: #333; margin-left: auto; padding: 20px"></i>    
    `;

    document.getElementById('bottom-left').innerHTML = `
        <div class="sub-part1" style="background-color: #f7e1e1;">            
            ${renderSection('Personal Information', [
                `<strong>Phone:</strong> ${resume.basics.phone}`,
                `<strong>Email:</strong> ${resume.basics.email}`,
                `<strong>LinkedIn:</strong> <a href="${resume.basics.profiles.url}" target="_blank">${resume.basics.profiles.network}</a>`
            ])}
            ${renderSection('Technical Skills', [
                resume.skills ? [
                    `<strong>Skill Name:</strong> ${resume.skills.name}`,
                    `<strong>Level:</strong> ${resume.skills.level}`,
                    `<strong>Keywords:</strong> ${resume.skills.keywords.join(', ')}`
                ] : 'No skills listed.'
            ])}
            ${renderSection('Hobbies', resume.interests.hobbies || 'No interests listed.')}
        </div>
    `;

    document.getElementById('bottom-right').innerHTML = `
        ${renderSection('Work Experience in previous company', [
            `<strong>Company Name:</strong> ${resume.work["Company Name"]}`,
            `<strong>Position:</strong> ${resume.work.Position}`,
            `<strong>Start Date:</strong> ${resume.work["Start Date"]}`,
            `<strong>End Date:</strong> ${resume.work["End Date"]}`,
            `<strong>Summary:</strong> ${resume.work.Summary}`
        ])}
        ${renderSection('Projects', [
            `<strong>Project Name:</strong> ${resume.projects.name}`,
            `<strong>Description:</strong> ${resume.projects.description}`
        ])}
        ${renderSection('Education', [
            `<strong>UG Institute:</strong> ${resume.education.UG.institute}`,
            `<strong>Course:</strong> ${resume.education.UG.course}`,
            `<strong>Start Date:</strong> ${resume.education.UG["Start Date"]}`,
            `<strong>End Date:</strong> ${resume.education.UG["End Date"]}`,
            `<strong>CGPA:</strong> ${resume.education.UG.cgpa}`,
            `<strong>Senior Secondary Institute:</strong> ${resume.education["Senior Secondary"].institute}`,
            `<strong>Senior Secondary CGPA:</strong> ${resume.education["Senior Secondary"].cgpa}`,
            `<strong>High School Institute:</strong> ${resume.education["High School"].institute}`,
            `<strong>High School CGPA:</strong> ${resume.education["High School"].cgpa}`
        ])}
        ${renderSection('Internship', [
            `<strong>Company Name:</strong> ${resume.Internship["Company Name"]}`,
            `<strong>Position:</strong> ${resume.Internship.Position}`,
            `<strong>Start Date:</strong> ${resume.Internship["Start Date"]}`,
            `<strong>End Date:</strong> ${resume.Internship["End Date"]}`,
            `<strong>Summary:</strong> ${resume.Internship.Summary}`
        ])}
        ${renderSection('Achievements', resume.achievements.Summary || 'No achievements listed.')}
    `;
};

// Render section with title and content
const renderSection = (title, content) => `
    <div class="resume-section">
        <h2 style="background-color: #a8a8a8;">${title}</h2>
        ${Array.isArray(content) ? content.map(item => `<p>${item}</p>`).join('') : `<p>${content}</p>`}
    </div>
`;

// Show no results card
const showNoResultsCard = () => {
    const resultContainer = document.getElementById('result-Container');
    resultContainer.innerHTML = '';
    document.getElementById('bottom-left').innerHTML = '';
    document.getElementById('top-Section').innerHTML = '';
    document.getElementById('resume-card').style.maxHeight = '200px';
    document.getElementById('resume-card').style.maxWidth ='400px';

    document.getElementById('resume-card').style.marginTop = '20px';


    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <i class="fas fa-frown" fa-10x style="font-size: 100px;"></i>
        <p>No such result found</p>
    `;
    
    resultContainer.appendChild(card);
};

// Update pagination buttons
const updatePaginationButtons = () => {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(filteredResumes.length / resumesPerPage);
};

// Paginate resumes
const paginateResumes = () => {
    const startIndex = (currentPage - 1) * resumesPerPage;
    const endIndex = startIndex + resumesPerPage;
    const currentResumes = filteredResumes.slice(startIndex, endIndex);
    
    if (currentResumes.length > 0) {
        displayResume(currentResumes[0]);
        document.getElementById('result-Container').innerHTML = '';
    } else {
        resumeContainer.innerHTML = '<p></p>';
        document.getElementById('bottom-right').innerHTML = '';
        showNoResultsCard();
    }
    
    updatePaginationButtons();
};

// Handle search
const handleSearch = () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    filteredResumes = searchTerm ? resumeData.filter(resume => 
        resume.skills.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)) ||
        resume.skills.name.toLowerCase().includes(searchTerm)
    ) : [];
    
    currentPage = 1;
    paginateResumes();
};

// Event listeners
searchInput.addEventListener('input', handleSearch);

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        paginateResumes();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(filteredResumes.length / resumesPerPage)) {
        currentPage++;
        paginateResumes();
    }
});

// Handle logout on blur
window.addEventListener('blur', () => {
    setTimeout(() => {
        if (document.visibilityState === 'hidden') {
            localStorage.setItem('loggedIn', 'false');
        }
    }, 1000);
});

// Check if user is logged in
const checkIfLoggedIn = () => {
    if (localStorage.getItem('loggedIn') === 'false') {
        window.location.href = 'index.html';
    }
};

window.addEventListener('load', checkIfLoggedIn);

// Prevent back navigation
history.pushState(null, document.title, location.href);
window.addEventListener('popstate', () => {
    history.pushState(null, document.title, location.href);
});

// Load resumes data on page load
loadResumes();
