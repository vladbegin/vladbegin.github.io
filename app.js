// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();  // расширяем WebApp на весь экран

// Переменные для корзины и итоговой цены
let cart = [];
let totalPrice = 0;

// Функция добавления товара в корзину
function addToCart(title, price) {
    cart.push({ title, price });
    totalPrice += parseFloat(price);
    console.log(`Товар ${title} добавлен в корзину. Цена: ${price} ₽`);
}

// Добавляем слушатели на кнопки "Добавить в корзину"
document.querySelectorAll('.product-add').forEach(button => {
    button.addEventListener('click', (event) => {
        const title = event.target.getAttribute('data-title');
        const price = event.target.getAttribute('data-price');
        addToCart(title, price);

        // Отправляем данные в Telegram Web App
        tg.MainButton.setText(`Оформить заказ на ${totalPrice} ₽`);
        tg.MainButton.show();
    });
});

// Обработка кнопки Telegram "Оформить заказ"
tg.MainButton.onClick(() => {
    // Отправляем итоговую сумму и заказанные товары обратно в бота
    tg.sendData(JSON.stringify({ cart, totalPrice }));
    tg.MainButton.hide();
});
