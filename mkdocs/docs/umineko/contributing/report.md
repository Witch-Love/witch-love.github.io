---
title: Hata Bildirimi
description: Umineko çevirisinden bize bir hata bildirin
---

!!! info "Bilgi"
	Basit hataları bildirmek için alttaki formu kullanabilirsiniz.  
	Daha detaylıca açıklamanız gereken önemli bir hatayı bildirmek için ise [GitHub](https://github.com/Witch-Love/umineko-scripting-tr/issues) sayfamıza uğrayabilirsiniz.

***

<form action="#" method="POST" id="report" class="md-typeset" style="max-width:500px;margin:auto;display:flex;flex-direction:column;gap:1rem;">

  <div style="display:flex;flex-direction:column;">
	<label for="episode" style="font-weight:500;margin-bottom:0.25rem;">Episode ve Chapter<br />(oyun içinden tıkladıysanız otomatik doldurulur)</label>
	<input class="md-input" type="text" id="chapter" name="chapter" placeholder="Örnek: Episode: 1, Chapter: Mektup ve Şemsiye" style="padding:0.5rem;border-radius:0.375rem;">
  </div>

  <div style="display:flex;flex-direction:column;">
    <label for="email" style="font-weight:500;margin-bottom:0.25rem;">E-mail (isteğe bağlı)</label>
    <input class="md-input" type="email" id="email" name="email" placeholder="Size geri dönüş yapabilmemiz için" style="padding:0.5rem;border-radius:0.375rem;">
  </div>

  <div style="display:flex;flex-direction:column;">
    <label for="message" style="font-weight:500;margin-bottom:0.25rem;">Mesaj</label>
    <textarea class="md-input" id="message" name="message" placeholder="Hata açıklaması veya hatalı metinden bir kesit" style="padding:0.5rem;border:none;border-radius:0.375rem;resize:none;height:150px;"></textarea>
  </div>

  <button id="submit-report" type="submit" class="md-button md-button--primary" style="padding:0.5rem 1rem;">Gönder</button>
</form>