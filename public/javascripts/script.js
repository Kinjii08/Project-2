document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");

    if (document.getElementById("register_user_role")) {
      chooseUserRole();
    }
  },
  false
);

function chooseUserRole() {
  const boxes = document.querySelectorAll(".role-radio");

  function changeRoleDisplay(evt) {
    const role = evt.target.value;
    const id = "role_" + role;
    const targetBlock = document.getElementById(id);

    targetBlock.classList.remove("is-hidden");
    const elementsToHide = document.querySelectorAll(`.role-block:not(#${id})`);
    elementsToHide.forEach(block => block.classList.add("is-hidden"));
    console.log(elementsToHide);
  }

  boxes.forEach(box => {
    box.onchange = changeRoleDisplay;
  });
}
