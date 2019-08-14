# Django MigDB

If your model structure has changed and you want to transfer data from the old model to the new one you can use **MigDB**.

## Features

- Python >=3.4, Django >=2.0
- Support Delete, Rename, Format, Format & Rename Fields

## Installation

Install using `pip`...

    pip install django-migdb

Add `'migdb'` to your `INSTALLED_APPS` setting.

    INSTALLED_APPS = [
        ...
        'migdb',
    ]

Add `path("migdb/", include("migdb.urls"))` to your `urlpatterns`.

    urlpatterns = [
        ...
        path("migdb/", include("migdb.urls")),
    ]

That's it, we're done!

    ./manage.py runserver

You can now open the MigDB Interface in your browser at `http://127.0.0.1:8000/migdb/`, and view your apps.

## Options

- **Rename**
    > change the field name.
- **Delete**
    > delete field.
- **Format**
    > format the field content. usages: Concatenate fields, Replace Field Content, Add Prefix and Postfix to Field Content.

    ### Examples

        @{username} # add prefix
        {first_name}-{last_name} # concatenate
        {count:0.0f} # convert float to int
        {username:5.5} # truncate string
        @website # replace with static content
    [read the documentation and see more examples](https://docs.python.org/3/library/string.html#format-examples)
- **Format And Rename**
    > field name have changed and also want to format the content.

## License

Copyright (c) Roundium. All rights reserved.

Licensed under the [MIT](LICENSE) license.
