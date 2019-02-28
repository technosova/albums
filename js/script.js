// Создание карточки
function createCard(image, caption, name, i) {

    var card = {
        id: id++,
        image: image,
        caption: caption.trim(),
        name: name.trim(),
    };

    cards.push(card);
    var cardElement = renderCard(card, i);
    var element = document.getElementById('card-block');//куда пихаем
    element.appendChild(cardElement);

    return card;
}

//восстановление карт
var lastCardImage = [];
var lastCardCaption = [];
var lastCardName = [];
var lastCard = document.getElementById("card-recovery-block__btn");
lastCard.innerText = 'Карточек для восстановления нет';
lastCard.disabled = true;

function lastCardonClick() {
    lastCard.onclick = function () {
        var i = lastCardImage.length - 1;

        createCard(lastCardImage[i], lastCardCaption[i], lastCardName[i], i);
        lastCardImage.splice(i, 1);
        lastCardCaption.splice(i, 1);
        lastCardName.splice(i, 1);
        i--;

        if (i < 1) {
            lastCard.innerText = 'Карточек для восстановления нет';
            lastCard.disabled = true;
        }
    };
}

lastCardonClick();

// Удаление карточки по айди
var delBtn = document.getElementById("card-delete-block__btn");
delBtn.onclick = function () {
    var numberDel = document.getElementsByTagName("input")[0];
    var val = parseInt(numberDel.value);

    lastCard.disabled = false;
    lastCard.innerText = 'Восстановить';

    if (val != numberDel.value) {
        alert('Введите целое неотрицательное число');
        return;
    }

    if (parseInt(val) < parseInt(0)) {
        alert('Введите целое неотрицательное число');
        return;
    }

    if (cardExists(val)) {
        lastCardImage.push(cards[val].image);
        lastCardCaption.push(cards[val].caption);
        lastCardName.push(cards[val].name);
        removeCard(val);
        renderAllCards();
    } else {
        alert('Такой карточки нет, введите число поменьше');
    }
};

// Добавление карточки по шаблону
function funcAdd() {
    createCard('./img/cat.jpeg', 'Название карточки', 'Карточка с котичкой', i)
}

var CreateCard = document.getElementById("card-create-block__btn");
var getCardCreateCaption = document.getElementsByClassName("card-create-block__caption")[0];
var caption = getCardCreateCaption.value;
var getCardCreateName = document.getElementsByClassName("card-create-block__name")[0];
var name = getCardCreateName.value;
var getCardCreateImage = document.getElementsByClassName('card-create-block__image')[0];
var image = getCardCreateImage.value;

//создание карты
CreateCard.onclick = function () {
    image = getCardCreateImage.value;
    caption = getCardCreateCaption.value;
    name = getCardCreateName.value;

    createCard(image, caption, name, i)
};

//отрисовка карты
function renderCard(card, i) {
    var cardCreate = document.createElement('div');//колонка
    cardCreate.className = 'col-lg-4 col-md-4 col-sm-6 col-xs-12 col-12';
    cardCreate.setAttribute('data-id', card.id);

    var cardCreateCard = document.createElement('div'); //карточка
    cardCreateCard.className = 'card';
    cardCreate.appendChild(cardCreateCard);

    var cardCreateCardImage = document.createElement('div');//картика карточки
    cardCreateCardImage.className = 'card-image';
    cardCreateCard.appendChild(cardCreateCardImage);

    var cardCreateNumber = document.createElement('div');//айдишник карты
    cardCreateNumber.className = 'card-number';

    cardCreateNumber.innerText = card.id;
    cardCreateCardImage.appendChild(cardCreateNumber);

    var cardCreateBtnClose = document.createElement('button');//кнопка закрытия
    cardCreateBtnClose.className = 'card__btn-close';
    cardCreateCardImage.appendChild(cardCreateBtnClose);

    var cardCreateBtnCopy = document.createElement('button'); //кнопка копирования
    cardCreateBtnCopy.className = 'card__btn-copy';
    cardCreateCardImage.appendChild(cardCreateBtnCopy);
    cardCreateBtnCopy.onclick = function (event) {
        var cardCopy = createCard(card.image, card.caption, card.name, i);
        var cardElement = renderCard(cardCopy);
        cardCreate.parentElement.appendChild(cardElement);
    };

    var cardCreateImg = document.createElement('img');//картинка
    cardCreateImg.className = 'card-img-top';
    cardCreateImg.setAttribute('src', card.image);//картинка из инпута
    cardCreateImg.alt = '...';
    cardCreateCardImage.appendChild(cardCreateImg);

//если у карты нет картинки
    if (card.image == '') {
        cardCreateCardImage.remove();
        cardCreateNumber.innerText = card.id;//айдишник
        cardCreateCard.appendChild(cardCreateNumber);
        cardCreateCaption = document.createElement('div'); //закрытие
        cardCreateCard.appendChild(cardCreateCaption);
        cardCreateBtnCopy = document.createElement('button');//копирование
        cardCreateBtnCopy.className = 'card__btn-copy';

        cardCreateCard.appendChild(cardCreateBtnCopy);
        cardCreateBtnCopy.onclick = function () {
            var cardCopy = createCard(card.image, card.caption, card.name, i);
            var cardElement = renderCard(cardCopy);
            cardCreate.parentElement.appendChild(cardElement);
        };

        cardCreateCaption.appendChild(cardCreateBtnClose);//закрытие на крестик карты без картинки
        cardCreateBtnClose.onclick = function (event) {
            cardCreate.remove();
            if (event.path[5].lastElementChild.innerHTML == '') {
                event.stopPropagation();
                renderAuthorList();
            }
            lastCardImage.push(card.image);
            lastCardCaption.push(card.caption);
            lastCardName.push(card.name);
            lastCard.disabled = false;
            lastCard.innerText = 'Восстановить';
            // renderAuthorList();
        };
    }

    var cardCreateCaption = document.createElement('div');//название
    cardCreateCaption.className = 'card__name';
    cardCreateCaption.innerText = card.caption;//название из инпута
    cardCreateCard.appendChild(cardCreateCaption);

    var cardBody = document.createElement('div'); //тело карточки
    cardBody.className = 'card-body';
    cardCreateCard.appendChild(cardBody);

    var cardUserName = document.createElement('div');//имя пользовател
    cardUserName.className = 'card__username';
    cardUserName.innerText = card.name;//имя из инпута

    cardBody.appendChild(cardUserName);

//закрытие на крестик
    cardCreateBtnClose.onclick = function () {
        cardCreate.remove();
        lastCardImage.push(card.image);
        lastCardCaption.push(card.caption);
        lastCardName.push(card.name);
        lastCard.disabled = false;
        lastCard.innerText = 'Восстановить';
        removeCard(card.id);
        if (event.path[5].lastElementChild.innerHTML == '') {
            renderAuthorList();
        }

    };

    return cardCreate;
}

function random(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

//рандомная картинка
function getRandomImg() {
    document.getElementById('card-create-block__btn-random').onclick = function () {
        var randomImg = ('https://placekitten.com/' + random(500, 550) + '/' + random(500, 550));
        getCardCreateImage.value = randomImg;
    }
}

getRandomImg();

var AlbumBlockBtn = document.getElementById('albumBlockMenu');//альбомы
var authorBlockId = document.getElementById('authorBlockId');
authorBlockId.style.display = 'none';
var cardBlockId = document.getElementById('cardBlockId');
cardBlockId.style.display = 'block';

AlbumBlockBtn.onclick = function () {
    authorBlockId.style.display = 'none';
    cardBlockId.style.display = 'block';
    var cardCreateBlock = document.getElementById('cardCreateBlock');
    cardCreateBlock.style.display = 'block';
    renderAllCards();
};

function renderAuthorBlock() {
    var cardBlockId = document.getElementById('cardBlockId');
    cardBlockId.style.display = 'none';
    var authorBlockId = document.getElementById('authorBlockId');
    authorBlockId.style.display = 'block';
    var cardCreateBlock = document.getElementById('cardCreateBlock');
    cardCreateBlock.style.display = 'none';
}

openAuthorCard = [];

function renderAuthorList() {
    var authorNameBlock = document.getElementById('author-block');//куда пихаем авторов
    authorNameBlock.innerHTML = '';

    authors = [];

    cards.forEach(function (item) {
        if (authors.includes(item.name) === false) {
            var authorNameList = document.createElement('li');
            authorNameList.className = "author-block__name";
            var authorNameListName = document.createElement('span');
            authorNameListName.className = "authorNameListName";
            authorNameListName.innerText = item.name;
            authorNameListName.id = item.id;
            authorNameList.appendChild(authorNameListName);
            authorNameBlock.appendChild(authorNameList);
            authors.push(item.name);
            var blockAuthorCard = document.createElement('div');
            blockAuthorCard.classList = "row authorListCardBlock";
            authorNameList.appendChild(blockAuthorCard);
            authorNameListName.onclick = clickAuthorBlockNameShow.bind(null, item.name);
            // debugger;
        }
    });
}

function clickAuthorBlockNameShow(authorName, event) {
    if (openAuthorCard.includes(authorName) === true) {
        openAuthorCard.forEach(function () {
            var index = openAuthorCard.indexOf(authorName);
            if (index >= 0) {
                openAuthorCard.splice(index, 1);
            }
        });
    }
    else {
        openAuthorCard.push(authorName);
    }
    console.log(openAuthorCard);
    if (event.path[1].lastElementChild.innerHTML !== '') {
        event.path[1].lastElementChild.innerHTML = '';
    } else {
        cards.forEach(function (card, i) {
            if (card.name === authorName) {
                var cardElement = renderCard(card, i);
                event.path[1].lastElementChild.appendChild(cardElement);
            }
        });
    }
}



var AuthorBlockBtn = document.getElementById('authorBlockMenu'); //авторы
AuthorBlockBtn.onclick = function () {
    renderAuthorBlock();
    renderAuthorList();
};


//фильтр автор-листа
document.getElementById('selectNameAuthor').onchange = function () {
    if (this.value == 2) {
        cards = cards.sort(function (card1, card2) {
            return card1.name.localeCompare(card2.name);
        })
    }
    if (this.value == 3) {
        cards = cards.sort(function (card1, card2) {
            return card2.name.localeCompare(card1.name);
        })
    }
    if (this.value == 1) {
        cards = cards.sort(function (card1, card2) {
            if (card1.id < card2.id) {
                return -1;
            }
            if (card1.id > card2.id) {
                return 1;
            }
            return 0;
        })
    }
    renderAuthorList();
};

//сортировка карточек
var cards = [];

function renderAllCards() {
    var cardBlock = document.getElementById('card-block');
    while (cardBlock.firstChild) {
        cardBlock.removeChild(cardBlock.firstChild);
    }
    cards.forEach(function (card) {
        cardBlock.appendChild(renderCard(card, i));
    })
}

//по названию
document.getElementById('selectCaption').onchange = function () {
    if (this.value == 2) {
        cards = cards.sort(function (card1, card2) {
            return card1.caption.localeCompare(card2.caption);
        })
    }
    if (this.value == 3) {
        cards = cards.sort(function (card1, card2) {
            return card2.caption.localeCompare(card1.caption);
        })
    }
    if (this.value == 1) {
        cards = cards.sort(function (card1, card2) {
            if (card1.id < card2.id) {
                return -1;
            }
            if (card1.id > card2.id) {
                return 1;
            }
            return 0;
        })
    }

    document.getElementById('selectName').value = 1;

    renderAllCards();
};

//по автору
document.getElementById('selectName').onchange = function () {
    if (this.value == 2) {
        cards = cards.sort(function (card1, card2) {
            return card1.name.localeCompare(card2.name);
        })
    }
    if (this.value == 3) {
        cards = cards.sort(function (card1, card2) {
            return card2.name.localeCompare(card1.name);
        })
    }
    if (this.value == 1) {
        cards = cards.sort(function (card1, card2) {
            if (card1.id < card2.id) {
                return -1;
            }
            if (card1.id > card2.id) {
                return 1;
            }
            return 0;
        })
    }
    document.getElementById('selectCaption').value = 1;

    renderAllCards();
};

//сортировка авторов по имени
function cardShowAuthor() {
    var clickCardName = document.getElementById("card-block");

    clickCardName.onclick = function (event) {

        if (!event.target.classList.contains('card__username')) {
            return;
        }
        var clickElement = event.path[0].innerText.trim();
        var i = 0;
        authors.forEach(function () {
            if (authors[i] === clickElement) {

                renderAuthorBlock();
                cards.forEach(function (card) {
                    if (card.name === clickElement) {
                        var cardElement = renderCard(card, i);
                        var element = document.getElementsByClassName('authorListCardBlock');//куда пихаем
                        cards.forEach(function () {
                            if (authors[i] === clickElement) {
                                element[i].appendChild(cardElement);
                            }
                        })
                    }
                });
            }
            i++;
        });
    };
}

cardShowAuthor();

function removeCard(id) {
    cards = cards.filter(function (item) {
        return item.id !== id;
    });
}

function cardExists(id) {
    return cards.map(function (card) {
        return card.id;
    }).indexOf(id) !== -1;
}

var id = 0;