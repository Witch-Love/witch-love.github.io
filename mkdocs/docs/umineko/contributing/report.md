---
title: Hata Bildirimi
description: Umineko çevirisinden bize bir hata bildirin
---

!!! info "Bilgi"
	Basit hataları bildirmek için alttaki formu kullanabilirsiniz.  
	Daha detaylıca açıklamanız gereken önemli bir hatayı bildirmek için ise [GitHub](https://github.com/Witch-Love/umineko-scripting-tr/issues) sayfamıza uğrayabilirsiniz.

!!! question "Otomatik doldurma (bunu tercih edin)"
	Bu sayfayı oyun içi menüde bulunan buton aracılığıyla açtığınızda form otomatik olarak doldurulmuş olur.

	Ardından metnin İngilizce ve Japoncasını görebilir, eklemek istediğiniz bir şey varsa da açıklama kutusuna yazabilirsiniz. 

***

<form action="#" method="POST" id="report" class="md-typeset" style="max-width:500px;margin:auto;display:flex;flex-direction:column;gap:1rem;">

<div style="display:flex;flex-direction:column;">
	<label for="chapter" style="font-weight:500;margin-bottom:0.25rem;">Episode ve Chapter*</label>
	<input class="md-input" type="text" id="chapter" name="chapter" placeholder="Örnek: Episode: 1, Chapter: 7" style="padding:0.5rem;border-radius:0.375rem;" required>
</div>

<div style="display:flex;flex-direction:column;">
	<label for="version" style="font-weight:500;margin-bottom:0.25rem;">Türkçe Oyun Sürümü (isteğe bağlı)</label>
	<input class="md-input" type="text" id="version" name="version" placeholder="Menü ekranında yazan sürüm" style="padding:0.5rem;border-radius:0.375rem;">
</div>

<div id="ingametext-wrapper" class="hidden" style="display:flex;flex-direction:column;">
	<label for="ingametext" style="font-weight:500;margin-bottom:0.25rem;">Oyun İçi Yazı*</label>
	<textarea class="md-input report-textarea" id="ingametext" name="ingametext" placeholder=""></textarea>
</div>

<div id="show-alternatives" class="hidden" style="display:flex;flex-direction:row;gap:1rem;padding:0 0.5rem;">
	<button type="button" id="show-en" class="md-button md-button--primary" style="padding:0.5rem 1rem;flex-grow:1;">İngilizcesini Gör</button>
	<button type="button" id="show-jp" class="md-button md-button--primary" style="padding:0.5rem 1rem;flex-grow:1;">Japoncasını Gör</button>
</div>

<textarea class="md-input report-textarea hidden" id="show-text" form="" readonly></textarea>

<span class="hidden" id="show-text-a-wrapper" style="text-align: right;font-size: smaller;margin: -0.8rem 0.1rem;"><a id="show-text-a" href="#" target="_blank">Kaynağa git</a></span>

<div style="display:flex;flex-direction:column;">
	<label for="message" style="font-weight:500;margin-bottom:0.25rem;">Açıklama</label>
	<textarea class="md-input report-textarea" id="message" name="message" placeholder="Hata açıklaması (gerekliyse)"></textarea>
</div>

<div style="display:flex;flex-direction:column;">
	<label style="font-weight:500;margin-bottom:0.25rem;">Size geri dönüş yapabilmemiz için (isteğe bağlı)</label>
	<div style="display:flex;flex-direction:row;gap:0.5rem;flex-wrap:wrap;">
		<input class="md-input" type="text" id="discord" name="discord" placeholder="Discord" style="padding:0.5rem;border-radius:0.375rem;flex:1 auto;">
		<input class="md-input" type="email" id="email" name="email" placeholder="Email" style="padding:0.5rem;border-radius:0.375rem;flex:1 auto;">
	</div>
</div>

<button type="submit" class="md-button md-button--primary" style="padding:0.5rem 1rem;">Gönder</button>
</form>