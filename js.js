window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
      header.classList.add('sticky-header');
    } else {
      header.classList.remove('sticky-header');
    }
  });
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleBtn');

  toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    sidebar.classList.toggle('active');
  });

  // إغلاق عند الضغط خارج
  document.addEventListener('click', function (e) {
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const searchName = document.getElementById("searchName");
  const searchStreet = document.getElementById("searchStreet");
  const filterLocation = document.getElementById("filterLocation");
  const filterType = document.getElementById("filterType");
  const filterPrice = document.getElementById("filterPrice");

  searchName.addEventListener("input", filterBarbers);
  searchStreet.addEventListener("input", filterBarbers);
  filterLocation.addEventListener("change", filterBarbers);
  filterType.addEventListener("change", filterBarbers);
  filterPrice.addEventListener("change", filterBarbers);

  function filterBarbers() {
      const nameValue = searchName.value.toLowerCase().trim();
      const streetValue = searchStreet.value.toLowerCase().trim();
      const locationValue = filterLocation.value.toLowerCase().trim();
      const typeValue = filterType.value.toLowerCase().trim();
      const priceValue = filterPrice.value;

      const cards = document.querySelectorAll(".barber-card");

      cards.forEach(card => {
          const name = card.querySelector("h3").textContent.toLowerCase();
          const type = card.querySelector("h4").textContent.toLowerCase();
          const location = card.querySelector("p:nth-of-type(1) span").textContent.toLowerCase();
          const phone = card.querySelector("p:nth-of-type(2) span").textContent.toLowerCase();
          const priceText = card.querySelector("p:nth-of-type(3) span").textContent;
          const price = parseFloat(priceText);

          const [locGovernorate, locCity, locStreet] = location.split('-');

          let matches = true;

          // فلترة بالاسم
          if (nameValue && !name.includes(nameValue)) matches = false;

          // فلترة بنوع الخدمة
          if (typeValue && !type.includes(typeValue)) matches = false;

          // فلترة بالمحافظة (الخانة الأولى)
          if (locationValue && (!locGovernorate || !locGovernorate.includes(locationValue))) matches = false;

          // فلترة بالسعر
          if (priceValue === "under5" && !(price < 5)) matches = false;
          if (priceValue === "5to10" && !(price >= 5 && price <= 10)) matches = false;
          if (priceValue === "above10" && !(price > 10)) matches = false;

          // فلترة الشارع + المدينة (أي ترتيب)
          if (streetValue) {
              const searchWords = streetValue.split(/[-\s]+/).map(w => w.trim());
              const combinedLocationWords = (locCity + " " + locStreet).toLowerCase();

              let locationMatch = true;
              searchWords.forEach(word => {
                  if (!combinedLocationWords.includes(word)) {
                      locationMatch = false;
                  }
              });

              if (!locationMatch) matches = false;
          }

          card.style.display = matches ? "block" : "none";
      });
  }
});