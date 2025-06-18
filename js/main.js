async function loadRecipes() {
  const age = document.getElementById("age").value;
  const recipesSection = document.getElementById("recipes");
  recipesSection.innerHTML = "<p>Yükleniyor...</p>";

  try {
    const res = await fetch("data/recipes.json");
    const data = await res.json();

    const filtered = data.recipes.filter(r => r.age <= age);

    if (filtered.length === 0) {
      recipesSection.innerHTML = "<p>Bu yaş grubu için henüz tarif bulunamadı.</p>";
      return;
    }

    recipesSection.innerHTML = filtered.map(recipe => `
      <div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
        <h3>${recipe.name}</h3>
        <p><strong>Yaş:</strong> ${recipe.age}+ ay</p>
        <p><strong>Malzemeler:</strong></p>
        <ul class="ingredients-list">
          ${recipe.ingredients.map(ingredient => `
            <li>• ${ingredient}</li>
          `).join('')}
        </ul>
        <p><strong>Hazırlık:</strong></p>
        <p>${recipe.instructions}</p>
      </div>
    `).join("");
  } catch (error) {
    recipesSection.innerHTML = "<p>Tarifler yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>";
    console.error("Veri yüklenemedi:", error);
  }
}
