from datetime import datetime, timedelta

def on_page_markdown(markdown, **kwargs):
	page = kwargs["page"]
	created = page.meta.get("git_creation_date_localized_raw_iso_datetime")

	if created is not None:
		status = page.meta.get("status")
		if status is None:
			d = datetime.fromisoformat(created)
			a = datetime.now()
			if d > (datetime.now() - timedelta(days=60)):
				page.meta["status"] = "new"

	return markdown