var img = document.getElementsByTagName("img"); // Получаем изображения

var check = new Array(9); // Для проверки клетки (пуста ли клетка) false - пуста true - занята

var win = new Array(9); // Чтобы знать крестик или нолик в клетке (true - крестик false - нолик)

var global_count; // Для проверки заполнены ли все клетки

var off = false; // Если кто то выйграл больше никто не мог ходить (true - будет означать что кто-то выйграл)

var player = 0; // Для того чтобы знать чья очередь ходить (0 - X) (1 - O)

var compCount = false; // Чтобы знать включен ли переключатель

var resylt; // Чтобы знать какой фигурой ходить компьютеру (false - крестиком)

var rand; // Для рандомного хода компьютера

var level = 0; // Для определения уровня (игры компьютера)

var browser = window.navigator.userAgent; // Получаем браузер пользователя

var Comp_win = false; // true будет означать что компьютер выйграл

var run = {
	comp: true,
	user: false
};

if (compCount == true && player == true && resylt == false) Comp_win = true; 
if (compCount == true && player == false && resylt == true) Comp_win = true;

/*
	0 | 1 | 2
	3 | 4 | 5		Игровое поле
	6 | 7 | 8
*/

document.querySelector("#first > span").addEventListener ("click", function () { level_click (0); });
document.querySelector("#second > span").addEventListener("click", function () { level_click (1); }); // Обработка событий кнопок
document.querySelector("#third > span").addEventListener ("click", function () { level_click (2); });

if (browser.indexOf("Firefox", 50) == -1) { // Исправление бага в браузерах (не файрфокс)
	document.querySelector("#output ~ span").style.left = "5px";
	document.querySelector("#output ~ span").style.bottom = "1px";
}

function level_click (int) // Работа кнопок выбора уровня
{
	if (int == 0)
	{
		level = 0;

		document.querySelector("#first > span").setAttribute("id", "third_choice");

		document.querySelector("#second > span").removeAttribute("id");
		document.querySelector("#third > span").removeAttribute("id");
	}
	else if (int == 1) 
	{
		level = 1;

		document.querySelector("#second > span").setAttribute("id", "third_choice");

		document.querySelector("#first > span").removeAttribute("id");
		document.querySelector("#third > span").removeAttribute("id");
	}
	else if (int == 2)
	{
		level = 2;

		document.querySelector("#third > span").setAttribute("id", "third_choice");

		document.querySelector("#first > span").removeAttribute("id");
		document.querySelector("#second > span").removeAttribute("id");
	}
	sessionStorage.setItem("level", level);
}

window.onload = function () // Для изменения длинны окна в соответствии с размером экрана
{
	html = document.querySelector('html');

	WIDTH = window.innerWidth;

	html.style.width = WIDTH + 'px';
};

window.onresize = function () // Изменение длинны окна при изменение длинны окна
{
	WIDTH = window.innerWidth;
	
	html.style.width = WIDTH + 'px';
};

function compGame ()
{
	if (off) return;

	if (player == resylt && level == 0) rand_comp (); // Если первый уровень то ход рандомный

	if (player == resylt)
	{
		// Проверка на угрозу по вертикале
		if 		(win[0] == run.user && win[1] == run.user && win[2] != run.comp) game (2);
		else if (win[2] == run.user && win[1] == run.user && win[0] != run.comp) game (0);
		else if (win[3] == run.user && win[4] == run.user && win[5] != run.comp) game (5);
		else if (win[5] == run.user && win[4] == run.user && win[3] != run.comp) game (3);
		else if (win[6] == run.user && win[7] == run.user && win[8] != run.comp) game (8);
		else if (win[8] == run.user && win[7] == run.user && win[6] != run.comp) game (6);
		else if (win[0] == run.user && win[2] == run.user && win[1] != run.comp) game (1);
		else if (win[3] == run.user && win[5] == run.user && win[4] != run.comp) game (4);
		else if (win[6] == run.user && win[8] == run.user && win[7] != run.comp) game (7);

		// Проверка на угрозу по горизонтале
		else if (win[0] == run.user && win[3] == run.user && win[6] != run.comp) game (6);
		else if (win[6] == run.user && win[3] == run.user && win[0] != run.comp) game (0);
		else if (win[1] == run.user && win[4] == run.user && win[7] != run.comp) game (7);
		else if (win[7] == run.user && win[4] == run.user && win[1] != run.comp) game (1);
		else if (win[2] == run.user && win[5] == run.user && win[8] != run.comp) game (8);
		else if (win[8] == run.user && win[5] == run.user && win[2] != run.comp) game (2);
		else if (win[0] == run.user && win[6] == run.user && win[3] != run.comp) game (3);
		else if (win[1] == run.user && win[7] == run.user && win[4] != run.comp) game (4);
		else if (win[2] == run.user && win[8] == run.user && win[5] != run.comp) game (5);

		// Проверка на угрозу по диагонали
		else if (win[0] == run.user && win[4] == run.user && win[8] != run.comp) game (8);
		else if (win[8] == run.user && win[4] == run.user && win[0] != run.comp) game (0);
		else if (win[2] == run.user && win[4] == run.user && win[6] != run.comp) game (6);
		else if (win[6] == run.user && win[4] == run.user && win[2] != run.comp) game (2);
		else if (win[0] == run.user && win[8] == run.user && win[4] != run.comp) game (4);
		else if (win[2] == run.user && win[6] == run.user && win[4] != run.comp) game (4);

/*
				0 | 1 | 2						0 | 3 | 6 /// 	0 = 0 | 1 = 3 | 2 = 6
				3 | 4 | 5		Игровое поле 	1 | 4 | 7 /// 	3 = 1 | 4 = 4 | 5 = 7
				6 | 7 | 8						2 | 5 | 8 /// 	6 = 2 | 7 = 5 | 8 = 8
*/
		else if (level == 3) // Если нет угрозы и 3 уровень то прогназирование хода
		{
			if (win[2] != run.user && win[4] != run.user && win[6] != run.user) // Нету вражеских фигур по правой диагонале
			{
				if 		(win[2] == run.comp && win[4] != run.com && win[6] != run.comp) game (6);
				else if (win[2] != run.comp && win[4] == run.com && win[6] != run.comp) game (2);
				else if (win[2] != run.comp && win[4] != run.com && win[6] == run.comp) game (2);

				else if (win[2] == run.comp && win[4] == run.com && win[6] != run.comp) game (6);
				else if (win[2] != run.comp && win[4] == run.com && win[6] == run.comp) game (2);
				else if (win[2] == run.comp && win[4] != run.com && win[6] == run.comp) game (4);
			}
			else if (win[0] != run.user && win[4] != run.user && win[8] != run.user) // Нету вражеских фигур по левой диагонале
			{
				if 		(win[0] == run.comp && win[4] != run.com && win[8] != run.comp) game (8);
				else if (win[0] != run.comp && win[4] == run.com && win[8] != run.comp) game (0);
				else if (win[0] != run.comp && win[4] != run.com && win[8] == run.comp) game (0);

				else if (win[0] == run.comp && win[4] == run.com && win[8] != run.comp) game (8);
				else if (win[0] != run.comp && win[4] == run.com && win[8] == run.comp) game (0);
				else if (win[0] == run.comp && win[4] != run.com && win[8] == run.comp) game (4);
			}
			else if (win[0] != run.user && win[3] != run.user && win[6] != run.user)  // Нету вражеских фигур в первом гориз столбце
			{
				if 		(win[0] == run.comp && win[3] != run.comp && win[6] != run.comp) game (6); // X| |
				else if (win[3] == run.comp && win[0] != run.comp && win[6] != run.comp) game (0); //  |X|
				else if (win[6] == run.comp && win[0] != run.comp && win[3] != run.comp) game (0); //  | |X

				else if (win[0] == run.comp && win[3] == run.comp && win[6] != run.comp) game (6); // X|X|
				else if (win[0] != run.comp && win[3] == run.comp && win[6] == run.comp) game (0); //  |X|X
				else if (win[0] == run.comp && win[3] != run.comp && win[6] == run.comp) game (3); // X| |X
			}
			else if (win[1] != run.user && win[4] != run.user && win[7] != run.user) // Нету вражеских фигур в втором гориз столбце
			{
				if 		(win[1] == run.comp && win[4] != run.comp && win[7] != run.comp) game (7); // X| |
				else if (win[4] == run.comp && win[1] != run.comp && win[7] != run.comp) game (1); //  |X|
				else if (win[7] == run.comp && win[1] != run.comp && win[4] != run.comp) game (1); //  | |X

				else if (win[1] == run.comp && win[4] == run.comp && win[7] != run.comp) game (7); // X|X|
				else if (win[1] != run.comp && win[4] == run.comp && win[7] == run.comp) game (4); //  |X|X
				else if (win[1] == run.comp && win[4] != run.comp && win[7] == run.comp) game (4); // X| |X
			}
			else if (win[2] != run.user && win[5] != run.user && win[8] != run.user) // Нету вражеских фигур в третьем гориз столбце
			{
				if 		(win[2] == run.comp && win[5] != run.comp && win[8] != run.comp) game (8); // X| |
				else if (win[5] == run.comp && win[2] != run.comp && win[8] != run.comp) game (2); //  |X|
				else if (win[8] == run.comp && win[2] != run.comp && win[5] != run.comp) game (2); //  | |X

				else if (win[2] == run.comp && win[5] == run.comp && win[8] != run.comp) game (8); // X|X|
				else if (win[2] != run.comp && win[5] == run.comp && win[8] == run.comp) game (2); //  |X|X
				else if (win[2] == run.comp && win[5] != run.comp && win[8] == run.comp) game (5); // X| |X
			}
			if (win[0] != run.user && win[1] != run.user && win[2] != run.user)  // Нету вражеских фигур в первом верт столбце
			{
				if 		(win[0] == run.comp && win[1] != run.comp && win[2] != run.comp) game (2); // X| |
				else if (win[1] == run.comp && win[0] != run.comp && win[2] != run.comp) game (0); //  |X|
				else if (win[2] == run.comp && win[0] != run.comp && win[1] != run.comp) game (0); //  | |X

				else if (win[0] == run.comp && win[1] == run.comp && win[2] != run.comp) game (2); // X|X|
				else if (win[0] != run.comp && win[1] == run.comp && win[2] == run.comp) game (0); //  |X|X
				else if (win[0] == run.comp && win[1] != run.comp && win[2] == run.comp) game (1); // X| |X
			}
			else if (win[3] != run.user && win[4] != run.user && win[5] != run.user) // Нету вражеских фигур в втором верт столбце
			{
				if 		(win[3] == run.comp && win[4] != run.comp && win[5] != run.comp) game (5); // X| |
				else if (win[4] == run.comp && win[3] != run.comp && win[5] != run.comp) game (3); //  |X|
				else if (win[5] == run.comp && win[3] != run.comp && win[4] != run.comp) game (3); //  | |X

				else if (win[3] == run.comp && win[4] == run.comp && win[5] != run.comp) game (5); // X|X|
				else if (win[3] != run.comp && win[4] == run.comp && win[5] == run.comp) game (3); //  |X|X
				else if (win[3] == run.comp && win[4] != run.comp && win[5] == run.comp) game (4); // X| |X
			}
			else if (win[6] != run.user && win[7] != run.user && win[8] != run.user) // Нету вражеских фигур в третьем верт столбце
			{
				if 		(win[6] == run.comp && win[7] != run.comp && win[8] != run.comp) game (8); // X| |
				else if (win[7] == run.comp && win[6] != run.comp && win[8] != run.comp) game (6); //  |X|
				else if (win[8] == run.comp && win[6] != run.comp && win[7] != run.comp) game (6); //  | |X

				else if (win[6] == run.comp && win[7] == run.comp && win[8] != run.comp) game (8); // X|X|
				else if (win[6] != run.comp && win[7] == run.comp && win[8] == run.comp) game (6); //  |X|X
				else if (win[6] == run.comp && win[7] != run.comp && win[8] == run.comp) game (7); // X| |X
			}
		}
		else rand_comp (); // Если нет угрозы то ход рандомный
   	}
}

function rand_comp () // Генерация случайного хода
{
	while (true)
   	{
   		//if (check[0]) rand = 0.5 + Math.random() * 9;

    	rand = 0.5 + Math.random() * (8 + 1);

   		rand = Math.round(rand);

		if (check[rand]) continue;

   		if (check[rand] == false) { game (rand); break; }
   	}
}
function game (int) // Принимает int чтобы знать на какую клетку нажали
{
	if (check[int] || off) return false; // Проверка не занята ли клетка

	if (player) // Определяет кто сейчас ходит
	{
		img[int].style.animationName = 'img';

		img[int].src = 'img/O.png';

		document.getElementById("output").textContent = 'первый';

		win[int] = true; // Значит в клетке Нолик
	}
	else 
	{
		img[int].style.animationName = 'img';

		img[int].src = 'img/X.png';

		document.getElementById("output").textContent = 'второй';

		win[int] = false; // Значит в клетке Крестик
	}

	player == false ? player = true : player = false; // Определяет очерёдность (чья очередь ходить)

	check[int] = true; // Чтобы повторно не занимать клетку мы обозначаем ее как заполненую

	switch (checking ()) 
	{
		case true:winning (1); break;
		case false: winning (0); break;
		case 2: winning (2);
	}

	if (compCount) setTimeout(compGame, 300);
}


// Перезагрузка
document.querySelector("#rel > p").onclick = function () { document.location.reload(false); }
document.getElementById("rel_2").onclick = function () { document.location.reload(false); }

// Обработка событий
img[0].onclick = function () { game (0); }
img[1].onclick = function () { game (1); }
img[2].onclick = function () { game (2); }
img[3].onclick = function () { game (3); }
img[4].onclick = function () { game (4); }
img[5].onclick = function () { game (5); }
img[6].onclick = function () { game (6); }
img[7].onclick = function () { game (7); }
img[8].onclick = function () { game (8); }

document.getElementById("comp").onclick  = function () { setTimeout(windows, 500); };
document.getElementById("Ncomp").onclick = function () { setTimeout(windows, 500); };

if (sessionStorage.getItem("level") != null)
	level_click (sessionStorage.getItem("level"));

if (sessionStorage.getItem("bar") == "true")
	setTimeout(windows, 500);

// Окно спрашивает Хотите ли начать первым?
function windows ()
{
	if (compCount) // Если переключетель выключают то происходит перезагрузка 
	{
		window.location.reload(false); 

		if (sessionStorage.getItem("bar") == "true") sessionStorage.removeItem("bar");

		if (sessionStorage.getItem("level") != null) sessionStorage.removeItem("level");

		return false;
	}
	else
		if (sessionStorage.getItem("bar") == null)	sessionStorage.setItem("bar", "true"); // если такое записи нет то сделать её


	if (browser.indexOf("Firefox", 50) == -1) { // Исправление вёрстки в браузерах на вебкит (блинк)
		document.querySelector("#output ~ span").style.left = "169px";
		document.querySelector("#output ~ span").style.bottom = "20px";
		document.querySelector("#output ~ span").style.position = "relative";
		document.querySelector("#level_123").style.top = "10px";
		document.querySelector("#level_123").style.paddingBottom = "30px";
		document.querySelector("#rel").style.left = "22px";
	}
	else {
		document.querySelector("#rel").setAttribute("id", "again_animation");//Просто анимация коректно работает только в файрфоксе
		document.querySelector("#again_animation").style.left = '26px';
		document.querySelector("#output ~ span").setAttribute("id", "fix476"); // Исправление вёрстки в файрфоксе
	}

	document.querySelector("#level_body").setAttribute("id", "level_animation");
	var fix = document.querySelectorAll(".window_string > td ~ td");
	fix[0].setAttribute("class", "fix");
	fix[1].setAttribute("class", "fix");
	document.querySelector("aside").setAttribute("id", "bar_animation");

	off = true;

	if (browser.indexOf("Firefox", 50) != -1) { resylt = window.confirm("Хотите начать первым?"); return comp(); }

	document.querySelector("aside").style.bottom = '553px';
	document.getElementById("windows").style.display = 'block';
	document.getElementById("Yes").onclick = function () { resylt = true; comp(); }
	document.getElementById("No").onclick = function () { resylt = false; comp(); }
}

// Инициалезация параметров, вывод окна, уровни, начало игры с компьютеров
function comp ()
{
	document.querySelector("aside").style.bottom = '430px';
	document.getElementById("windows").style.display = 'none';

	if (level == 0) level_click (0);

	if (resylt == false) // Комп крестиком
	{ 
		run.comp = false; run.user = true; 

		document.querySelector("#X").textContent = "Компьютер";
		document.querySelector("#Y").textContent = "Вы";
	}
	if (resylt) // Комп ноликом 
	{ 
		run.comp = true; run.user = false;

		document.querySelector("#Y").textContent = "Компьютер";
		document.querySelector("#X").textContent = "Вы";
	}

	clearAll ();

	compCount = true;

	compGame ();
}

function clearAll () // Если переключатель был включен во время игры то функция вернёт всё в исходное состояния (переменные и стили)
{
	for (var i=0; i < 9; i++)
	{
		check[i] = false;

		win[i] = undefined;

		img[i].src = 'img/emptiness.png';
	}

	compCount = false;

	global_count = 0;

	off = false;

	player = 0;

	document.getElementById("win").style.display = 'none';

	document.body.firstElementChild.textContent = 'The Tic Tac Game!';
}

function winning (int) // Обработка выйграша принимает int чтобы знать кто выйграл
{
	if (compCount == true && player == false && resylt == true) Comp_win = true; 
	if (compCount == true && player == true && resylt == false) Comp_win = true;

	if (int == 1)
	{
		Comp_win ? 
		document.body.firstElementChild.textContent = "Вы проиграли" :
		document.body.firstElementChild.textContent = 'Первый игрок';

		if (compCount) document.body.firstElementChild = "Вы выйграли";

		Comp_win ? document.querySelector("#lose").style.display = "block" : document.getElementById("win").style.display = 'block';

		document.getElementById("output1").textContent = "Сейчас никто не ходит";
	}
	if (int == 0) 
	{
		Comp_win ? 
		document.body.firstElementChild.textContent = "Вы проиграли" :
		document.body.firstElementChild.textContent = 'Первый игрок';

		if (compCount) document.body.firstElementChild.textContent = "Вы выйграли";

		Comp_win ? document.querySelector("#lose").style.display = "block" : document.getElementById("win").style.display = 'block';

		document.getElementById("output1").textContent = "Сейчас никто не ходит";
	}
	if (int == 2) { document.body.firstElementChild.textContent = 'Никто не выйграл'; }

	off = true; // Так как off true то больше нельзя заполнять пустыке клетки
}

// Проверка выйграша
function checking () // 0 - нолик 1 - крестик
{
	// Выйгрыш по вертикале
	if (win[0] && win[1] && win[2]) return false;
	else if (win[0] == false && win[1] == false && win[2] == false) return true;
	else if (win[3] && win[4] && win[5]) return false;
	else if (win[3] == false && win[4] == false && win[5] == false) return true;
	else if (win[6] && win[7] && win[8]) return false;
	else if (win[6] == false && win[7] == false && win[8] == false) return true;

	// Выйгрыш по горизонтале
	else if (win[0] && win[3] && win[6]) return false;
	else if (win[0] == false && win[3] == false && win[6] == false) return true;
	else if (win[1] && win[4] && win[7]) return false;
	else if (win[1] == false && win[4] == false && win[7] == false) return true;
	else if (win[2] && win[5] && win[8]) return false;
	else if (win[2] == false && win[5] == false && win[8] == false) return true;

	// Выйгрыш по диагонале
	else if (win[0] && win[4] && win[8]) return false;
	else if (win[0] == false && win[4] == false && win[8] == false) return true;
	else if (win[2] && win[4] && win[6]) return false;
	else if (win[2] == false && win[4] == false && win[6] == false) return true;

	// Проверка заполнены ли все клетки?
	global_count = 0;

	for (var count = 0; count < 8; count++)
	{
		if (check[count]) global_count++;

		if (global_count == 8) return 2;
	}	
}