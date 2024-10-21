import '../styles/style.css';
import '../styles/background.css'

let currentPage = 0;
let query = '';

document.getElementById('search-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    query = document.getElementById('query').value;
    currentPage = 0; // Сбрасываем на первую страницу при новом поиске
    document.body.style.overflowY = 'hidden'; // Отключаем скролл перед началом поиска
    await fetchVacancies(query, currentPage);
});

async function fetchVacancies(query, page) {
    const vacancyList = document.getElementById('vacancy-list');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const pageNum = document.getElementById('page-num');
    const pagination = document.getElementById('pagination');

    vacancyList.innerHTML = ''; // Очищаем предыдущие результаты

    try {
        const response = await axios.get(`https://api.hh.ru/vacancies?text=${encodeURIComponent(query)}&per_page=10&page=${page}`);
        const vacancies = response.data.items;

        if (vacancies.length === 0) {
            vacancyList.innerHTML = '<li>Вакансий не найдено</li>';
            nextButton.disabled = true; // Отключаем кнопку "Следующая", если вакансий нет
            pagination.classList.add('hidden'); // Прячем пагинацию при отсутствии результатов
            return;
        }

        // Отображаем вакансии
        vacancies.forEach(vacancy => {
            const vacancyItem = document.createElement('li');
            vacancyItem.className = 'vacancy-item';
            vacancyItem.innerHTML = `
                <h2>${vacancy.name}</h2>
                <p><strong>Компания:</strong> ${vacancy.employer.name}</p>
                <p><strong>Зарплата:</strong> ${vacancy.salary ? `${vacancy.salary.from} - ${vacancy.salary.to} ${vacancy.salary.currency}` : 'Не указана'}</p>
                <a href="${vacancy.alternate_url}" target="_blank">Подробнее</a>
            `;
            vacancyList.appendChild(vacancyItem);
        });

        pagination.classList.remove('hidden');
        document.body.style.overflowY = 'scroll';

    } catch (error) {
        console.error('Ошибка при получении вакансий:', error);
        vacancyList.innerHTML = '<li>Произошла ошибка при загрузке вакансий</li>';
        pagination.classList.add('hidden'); // Прячем пагинацию при ошибке
    }
}