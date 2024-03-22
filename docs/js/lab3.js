// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role
// took js form there
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');
    const tabList = document.querySelector('[role="tablist"]');

    // for the starting page
    tabs.forEach(t => t.setAttribute("aria-selected", "false"));
    tabs[0].setAttribute("aria-selected", "true");
    tabPanels.forEach(panel => panel.setAttribute("hidden", "true"));
    tabPanels[0].removeAttribute("hidden");
    // Add click event listener to each tab
    tabs.forEach((tab, index) => {

        tab.addEventListener("click", () => {
            // Remove 'aria-selected' attribute from all tabs
            tabs.forEach(t => t.setAttribute("aria-selected", "false"));
            // Set 'aria-selected' attribute to true for the clicked tab
            tab.setAttribute("aria-selected", "true");
            // Hide all tab panels
            tabPanels.forEach(panel => panel.setAttribute("hidden", "true"));
            // Show the corresponding tab panel
            tabPanels[index].removeAttribute("hidden");
        });
    });

    // Enable arrow navigation between tabs in the tab list
    let tabFocus = 0;

    tabList.addEventListener("keydown", (e) => {
        // Move right
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            tabs[tabFocus].setAttribute("tabindex", -1);
            if (e.key === "ArrowRight") {
                tabFocus++;
                // If we're at the end, go to the start
                if (tabFocus >= tabs.length) {
                    tabFocus = 0;
                }
                // Move left
            } else if (e.key === "ArrowLeft") {
                tabFocus--;
                // If we're at the start, move to the end
                if (tabFocus < 0) {
                    tabFocus = tabs.length - 1;
                }
            }

            tabs[tabFocus].setAttribute("tabindex", 0);
            tabs[tabFocus].focus();
        }
    });
});
