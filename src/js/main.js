'use strict';


document.addEventListener('DOMContentLoaded', function(){
    bodyHeight();
    SideBarNavHeight();
    newSupplyMobile();
    menuMobile();

    //Checkbox in search table
    let select_all_checkboxes = document.getElementById("select_all_checkboxes");
    let delete_checkbox = document.getElementsByClassName("table-check-input");
    // if the user clicks on the 'select_all_checkboxes'
	select_all_checkboxes.addEventListener("click", function () {
		for (let i = 0; i < delete_checkbox.length; i++) {
			if (select_all_checkboxes.checked === true) {
				delete_checkbox[i].checked = true;
			} else {
				delete_checkbox[i].checked = false;
			}
		}
	});

    for (let i = 0; i < delete_checkbox.length; i++) {
		delete_checkbox[i].addEventListener("click", function () {
			if (delete_checkbox[i].checked === false) {
				select_all_checkboxes.checked = false;
			}
		});
	}

    flatpickr("#datePicker", {
        wrap: true,
        dateFormat: "d/m/Y",
        appendTo: document.getElementById('filter-mobile')
    });

    
});

window.addEventListener('resize', function(event) {
    menuMobile();
    bodyHeight();
    SideBarNavHeight() ;
    newSupplyMobile();
}, true);

function SideBarNavHeight() {
    let sidebar_logo = document.querySelector('.sidebar__logo').offsetHeight;
    let sidebar_nav = document.querySelector('.sidebar__nav');
    let sidebar__footer = document.querySelector('.sidebar__footer').offsetHeight;

    sidebar_nav.style.height = `calc(100% - ${sidebar_logo}px - ${sidebar__footer}px - 20px)`
    sidebar_nav.style.overflow = 'auto'
}

function bodyHeight() {
    document.querySelector('body').style.height = window.innerHeight + 'px'
}

function newSupplyMobile() {
    let window_width = innerWidth;
    let supply_btn = document.querySelector('.new-supply__btn');
    let site_hamburger = document.querySelector('.hamburget-btn');
    let search_tab_nav = document.querySelector('.search-tab__nav')
    if(window_width < 991) {
        site_hamburger.after(supply_btn)
    } else {
        search_tab_nav.after(supply_btn)
    }
}

function menuMobile() {
    let body = document.querySelector('body');
    let sidebar = document.querySelector('.sidebar');
    document.querySelector('.hamburget-btn').addEventListener('click', function() {
        const overlay = document.createElement("div");
        overlay.classList.add('overlay');
        body.appendChild(overlay);
        sidebar.classList.toggle('show');
    })

    document.addEventListener('click', function (e) {
        if(e.target == sidebar) {
            sidebar.classList.remove('show')
        }
    });
}

$(function() {
    let CustomSelectionAdapter = $.fn.select2.amd.require("select2/selection/customSelectionAdapter");
    $('.filter-mobile__select').select2({
        // tags: true,
        dropdownParent: $('#filter-mobile'),
        selectionAdapter: CustomSelectionAdapter,
        placeholder: 'Please enter 2 or more characters'
    });
})