const addChannelBtn = document.getElementById('addChannelBtn');
const modal = document.getElementById('modal');
const modalOverlay = modal.querySelector('.modal__overlay');
const channelsList = document.getElementById('channelsList');
const searchInput = document.querySelector('.search__input');

// моковый массив каналов
let channels = [
  { id: 150511, name: 'Канал 268', funnel: 'Воронка Неразобранное', account: '1231231231', status: 'Авторизуйтесь' },
  { id: 150512, name: 'Канал 270', funnel: 'Воронка Неразобранное', account: '4564564564', status: 'Авторизуйтесь' },
  { id: 150513, name: 'Канал 278', funnel: 'Воронка Неразобранное', account: '7897897897', status: 'Авторизуйтесь' },
  { id: 150514, name: 'Канал 279', funnel: 'Воронка Неразобранное', account: '1011011011', status: 'Авторизуйтесь' },
  { id: 150515, name: 'Канал 280', funnel: 'Воронка Неразобранное', account: '1021021021', status: 'Авторизуйтесь' },
  { id: 150516, name: 'Канал 281', funnel: 'Воронка Неразобранное', account: '1031031031', status: 'Авторизуйтесь' },
  { id: 150517, name: 'Канал 282', funnel: 'Воронка Неразобранное', account: '1041041041', status: 'Авторизуйтесь' },
  { id: 150519, name: 'Канал 288', funnel: 'Воронка Неразобранное', account: '10610610611', status: 'Авторизуйтесь' },
  { id: 150520, name: 'Канал 289', funnel: 'Воронка Неразобранное', account: '1071071071', status: 'Авторизуйтесь' }
];

function renderChannels(filter = '') {
  channelsList.innerHTML = '';

  channels
    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.account.toLowerCase().includes(filter.toLowerCase()))
    .forEach(c => {
      const row = document.createElement('tr');
      row.classList.add('table__row');
      row.dataset.id = c.id; // Добавляем id для удаления
      row.innerHTML = `
        <td class="table__cell">${c.name}</td>
        <td class="table__cell">${c.funnel}</td>
        <td class="table__cell">ID: <br> Профиль <br> ${c.account}</td>
        <td class="table__cell">${c.status}</td>
        <td class="table__cell table__action">
          <div class="action-menu">
            <span class="action-menu__dots">⋮</span>
            <ul class="action-menu__list visually-hidden">
              <li class="action-menu__item">Настройки</li>
              <li class="action-menu__item action-menu__item--danger">Удалить сессию</li>
            </ul>
          </div>
        </td>
      `;
      channelsList.appendChild(row);
    });
}

channelsList.addEventListener('click', e => {
  const target = e.target;

  if (target.classList.contains('action-menu__dots')) {
    e.stopPropagation();
    const menu = target.nextElementSibling;
    menu.classList.toggle('visually-hidden');
    return;
  }

  if (target.classList.contains('action-menu__item--danger')) {
    const row = target.closest('tr');
    const id = Number(row.dataset.id);
    channels = channels.filter(c => c.id !== id); // Удаляем по id
    renderChannels(searchInput.value); // Перерисовываем таблицу
  }
});

document.addEventListener('click', () => {
  document.querySelectorAll('.action-menu__list').forEach(menu => menu.classList.add('visually-hidden'));
});

addChannelBtn.addEventListener('click', () => modal.classList.remove('visually-hidden'));

modalOverlay.addEventListener('click', () => modal.classList.add('visually-hidden'));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modal.classList.add('visually-hidden');
});

searchInput.addEventListener('input', e => renderChannels(e.target.value));

renderChannels();
