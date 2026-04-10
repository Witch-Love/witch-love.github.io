---
title: Umineko Türkçe Sürüm Kontrolü
description: Türkçe yamanın versiyonunun güncel olup olmadığını kontrol edebilirsiniz.
status: new
index: false
---

!!! info "Bilgi"
	Bu sayfadan Türkçe yamanın güncel olup olmadığını kontrol edebilirsiniz.

	Sayfayı oyunun ana ekranından tıklayarak açtığınızda sürüm otomatik aşağıya yazılır.  

***

<form action="#" method="POST" id="checkversion" class="md-typeset" style="max-width:500px;margin:auto;display:flex;flex-direction:column;gap:1rem;">

  <div style="display:flex;flex-direction:column;">
    <label for="currentversion" style="font-weight:500;margin-bottom:0.25rem;">Türkçe Oyun Sürümü</label>
    <div style="display:flex;flex-direction:row;gap: 0.5rem;">
		<input class="md-input" type="text" id="currentversion" name="currentversion" placeholder="Ana ekranda yazan versiyon (ör: r4394)" style="padding:0.5rem;border-radius:0.375rem;flex: 1 1 auto;" required>
  		<button id="submit-checkversion" type="submit" class="md-button md-button--primary" style="padding:0.5rem 1rem;">Kontrol Et</button>
	</div>
  </div>

</form>