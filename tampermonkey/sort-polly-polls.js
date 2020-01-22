// ==UserScript==
// @name         Order poll.ly questions
// @namespace    http://poll.ly/#/
// @version      0.1
// @description  try to take over the world!
// @author       Simon Adams
// @match        https://poll.ly/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener("load", (event) => {
        const pollBody = document.querySelector(".poll-container");
        const questions = pollBody.querySelectorAll(".poll-body ul li");

        window.setInterval(update(questions), 1000);
    });

    function update(questions) {
        const addItem = [...questions].pop()
        const items = [...questions]
            .slice(0, -1)
            .map(q => {
                const title = q.querySelector(".suggestion-body span").textContent || ""
                const votes = q.querySelector(".suggestion-count span").textContent || 0

                q.parentNode.removeChild(q);
                return { "title": title, "element": q, "votes": votes }
            })
            .sort((a, b) => b.votes - a.votes);

        items.map(item => addItem.parentNode.insertBefore(item.element, addItem));
        return;
    }
})();