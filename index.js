document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchHistoryContainer = document.getElementById('searchHistoryContainer');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            updateSearchHistory(searchTerm);
            displaySearchHistory();
            searchInput.value = ''; 
        }
    });

    searchInput.addEventListener('focus', function () {
        displaySearchHistory();
        searchHistoryContainer.style.display = 'block';
    });

    searchInput.addEventListener('blur', function () {
        setTimeout(() => {
            searchHistoryContainer.style.display = 'none';
        }, 200);
    });

    searchHistoryContainer.addEventListener('click', function (event) {
        if (event.target.tagName === 'SPAN') { 
            searchInput.value = event.target.textContent;
            searchHistoryContainer.style.display = 'none';
        } else if (event.target.classList.contains('remove-button')) {
            const index = event.target.dataset.index;
            removeHistoryItem(index);
            displaySearchHistory();
        }
    });
    searchHistoryContainer.addEventListener('mousedown', function (event) {
        if (event.target.classList.contains('remove-button')) {
            event.preventDefault();
        }
    });

    function updateSearchHistory(term) {
        let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

        const normalizedTerm = term.toLowerCase();
        history = history.filter(item => item.toLowerCase() !== normalizedTerm);
        history.unshift(term);

        if (history.length > 10) {
            history.pop();
        }

        localStorage.setItem('searchHistory', JSON.stringify(history));
    }

    function displaySearchHistory() {
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistoryContainer.innerHTML = history.length
            ? history
                .map(
                    (item, index) =>
                        `<div class="history-item">
                            <span>${item}</span>
                            <button class="remove-button" data-index="${index}">&times;</button>
                        </div>`
                )
                .join('')
            : '<p style="padding: 8px 12px; color: #999;">No recent searches</p>';
    }

    function removeHistoryItem(index) {
        let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        history.splice(index, 1);
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }
});
