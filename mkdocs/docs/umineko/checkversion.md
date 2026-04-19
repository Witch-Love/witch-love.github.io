---
title: Oyun Sürümü Kontrolü
description: Umineko Türkçe yamanın versiyonunun güncel olup olmadığını kontrol edebilirsiniz.
index: false
---

!!! info "Bilgi"
	Bu sayfadan Türkçe yamanın güncel olup olmadığını kontrol edebilirsiniz.

	Sayfayı oyunun ana ekranından tıklayarak açtığınızda sürümün güncel olup olmadığı otomatik olarak kontrol edilir.  

***

<form action="#" method="POST" id="checkversion" class="md-typeset" style="max-width:500px;margin:auto;display:flex;flex-direction:column;gap:1rem;">

  <div style="display:flex;flex-direction:column;">
    <label for="currentversion" style="font-weight:500;margin-bottom:0.25rem;">Türkçe Oyun Sürümü</label>
    <div style="display:flex;flex-direction:row;gap: 0.5rem;">
		<input class="md-input" type="text" id="currentversion" name="currentversion" placeholder="Ana ekranda yazan versiyon (ör: r4394)" style="padding:0.5rem;border-radius:0.375rem;height: 100%;flex: 1 1 auto;" required>
  		<button type="submit" class="md-button md-button--primary" style="padding:0.5rem 1rem;">Kontrol Et</button>
	</div>
  </div>

</form>