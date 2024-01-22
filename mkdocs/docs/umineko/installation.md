---
icon: material/download 
---

# 1. Umineko Project

!!! abstract "Not"
	Bu sayfa [Umineko Project](https://umineko-project.org/en/)'in kurulumu içermektedir.  
	Umineko Project kurulumunu çoktan yaptıysanız bu sayfayı atlayıp [2. adıma](../tr-installation) geçebilirsiniz.

???+ warning "Umineko Project: Önemli Telif Hakkı Uyarısı"
	Alttaki metin **Umineko Project**'in sitesinde bulunan [Copyright message](https://umineko-project.org/en/copyright-message/) sayfasından alınmıştır.

	Bu açıklamayı kabul ediyorsanız rehberi okumaya devam edebilirsiniz.

	```{ .txt .no-copy }
	This game may violate various copyrights of Ryukishi07, Alchemist, artists, musicians, voice actors, translators, and more.
	
	It is not our intent to financially (or otherwise) harm any of these people or companies. It is simply not financially possible for us to obtain permission to legally distribute this game with all its features, and we opted for English and Russian versions of Umineko PS3 to exist in this state instead of not at all.

	We ask all our users to support these people by buying the products that made this game possible: the PC release of Umineko no Naku Koro ni EP4, and the PS3 release of Umineko no Naku Koro ni Rondo — even if you do not own a PS3.

	Usage of this game is prohibited if you do not own either one of these two games.

	You are forbidden to redistribute the intact game without this copyright message and a link to Umineko Project website. You are forbidden to redistribute the game with any modifications unless officially allowed by Umineko Project.

	Disclaimer:
	This software is provided “as is”, without warranty of any kind, expressed or implied. In no event shall the authors be liable for any damages or other issues caused by the software, their website or anything related. The software is provided for private, non-commercial use only. For use outside Japan only.

	The password to extract the game archive can be constructed if you own the PC and PS3 games, as follows:

	1. Find the large bold numbers on the back cover of the PS3 game manual, and write them down without hyphens.
	2. Look up the number before “KB” at the bottom of page 4 of the PS3 game manual, and append it to the end of what you already wrote.
	3. Find the “うみねこのなく頃に.exe” file of the PC game, and append its size in bytes (not “size on disk”) to the end.
	4. Finally, find the “nscript.dat” file of the PC game, and append its size in bytes (not “size on disk”) to the end.
	
	At this point you will have a 27-digit passphrase you can use to unpack the archives.
	```

!!! info "Kurulum hakkında"
	Kurulum işlemleri karışık görünüyor olsa da aslında oldukça basittir. Adımların tamamı yalnızca indirmiş olduğunuz arşiv dosyalarını çıkartıp tek bir klasöre toplamaktan ibaret.

	Tüm adımları dikkatlice takip etmeye özen gösterirseniz bir sorun yaşamadan kurulumu tamamlayabileceksiniz.

Windows kurulumu haricinde bir rehberimiz bulunmuyor fakat göz atmak isterseniz bizim rehberimiz olmayan [Android kurulum](https://uminekoprojectandroid.neocities.org) rehberine bakabilirsiniz.

***

## Başlangıç

Her şeyden önce bilgisayarınızın herhangi bir yerinde yeni bir klasör oluşturun. İsmi önemli değil, istediğiniz ismi koyabilirsiniz. İndirdiğiniz dosyaları bu klasörde toplayacak ve oyunu bu klasörden başlatacaksınız.

Klasörü oluşturduktan sonra indirme kısımlarına geçiyoruz. İndirme işlemlerine başlamak için Umineko Project'in sitesinde bulunan [Downloads](https://umineko-project.org/en/downloads/) sayfasını açalım ve her adımın resimlerinde gösterilen şekilde dosyaları indirelim.

## 1. Resources İndirmeleri

<img src="https://i.imgur.com/0a5u0Or.png" />

Şimdi burada önemli bir kısım var. Burada indireceğiniz 12 dosyanın hepsi aslında tek bir dosyanın bölünmüş hali. Yani, buradaki tüm dosyaları indirene kadar bu dosyaları `(yani dosyayı)` açamazsınız.

^^SADECE AMA SADECE^^ bu 12 dosyanın hepsinin indirmesi tamamlandıktan ve hepsini aynı klasörde topladıktan sonra `umiproj_31.12.19.7z.001` adlı dosyayı açabileceksiniz.

On iki dosyanın tamamı indirildikten sonra yapmanız gereken şey WinRAR gibi bir arşiv programı kullanarak `umiproj_31.12.19.7z.001` adlı dosyayı açmaktır.

??? warning "Arşiv Şifresi"
	Sayfanın başında bulunan telif hakkı uyarısını kabul ettiğinizi varsayıyoruz.

	```
	035646750436634546568555050
	```

Dosyayı açtıktan sonra dosyayı önceden oluşturmuş olduğunuz klasöre çıkartın. Bu adım neredeyse oyunun tüm dosyalarını içerdiğinden bilgisayarınızın hızına bağlı olarak biraz zaman alacaktır.

-----

## 2. Scripts İndirmesi

Bu adım basit. [Buradan](https://github.com/umineko-project/umineko-scripting/releases/download/z4050/umineko-main-scripts_r4050.zip) oyunun scriptlerinin bulunduğu dosyayı indirin ve klasörünüze çıkartın.

-----

## 3. Game Engine İndirmesi

Bu adım da oldukça basit. Kendi işletim sisteminize uygun olanı seçip indirin ve klasörünüze çıkartın.

Bu adımla beraber Umineko Project kurulumu tamamlanıyor. Türkçe Patch'i kurmak için bir sonraki adımı da tamamlayın.

> [!NOTE]
> Windows kullananlar `Windows XP` ve `32-bit` yazdığına aldırış etmesinler. Bunu indirmeniz gerekiyor.

<img src="https://i.imgur.com/F35o4lp.png" width="700">

-----

## Türkçe Patch Kurulumu

1. [Türkçe Script](../../releases/latest/download/umineko-tr-scripts.zip) linkinden Türkçe scriptleri,  
2. [Türkçe Dosyalar](../../../umineko-scripting-tr-files/releases/latest/download/umineko-tr-files.zip) linkinden de Türkçe dosyaları indirin.

İndirdiğiniz bu iki arşiv dosyasını da önceki adımlarda olduğu gibi klasörünüze çıkartın.

-----

### Kurulum Tamamlandı

Kurulum tamamlandıktan sonra klasörünüz aşağıdaki şekilde görünmeli. Eğer ekstra bir klasör bulunuyorsa ya da eksik varsa bir şeyleri yanlış yapmış olma ihtimaliniz yüksek.  
Artık klasörünüzün içindeki `onscripter-ru.exe` dosyasından oyununuzu başlatabilirsiniz!  
Oyunu açtıktan sonra oyun dilini `Witch Love` olarak ayarladığınızda oyununuz Türkçe olacaktır. İyi okumalar!

**Notlar:**
- Oyunda herhangi bir sorunla karşılaşırsanız yönetici olarak çalıştırmayı deneyin.
- Çeviri çalışması hâlâ devam ettiği için scriptlerinizin ve dosyalarınızın güncel olduğundan emin olup oynamanız daha iyi olacaktır. Bir chapter çevirisi her bittiğinde veya önemli bir güncelleme yaptığımızda yeni sürüm yayınlıyoruz. Türkçe yamayı güncellemek için [Türkçe Patch Kurulumu](#türkçe-patch-kurulumu) adımını tekrarlamanız yeterlidir.

<img src="https://i.imgur.com/g3vlw1d.png" width="700">