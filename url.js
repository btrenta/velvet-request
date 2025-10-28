javascript:(async()=>{ 
  const r=await fetch('https://drive.google.com/uc?export=download&id=1y_kwmvf7oIftjHZXY853MjR3h2B3cNKL');
  const links=await r.json();
  let i=parseInt(localStorage.getItem('recipeIndex')||0);
  if(i<links.length){
    window.open(links[i],'_blank');
    localStorage.setItem('recipeIndex',i+1);
  } else {
    alert('All done.');
    localStorage.removeItem('recipeIndex');
  }
})();