import os

from setuptools import find_packages, setup

version = __import__('migdb').__version__

here = os.path.abspath(os.path.dirname(__file__))
README = open(os.path.join(here, 'README.md')).read()

# allow setup.py to be run from any path
os.chdir(os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir)))

setup(
    name='django-migdb',
    version=version,
    python_requires='>=3.4',
    packages=find_packages(exclude=["*.tests", "*.tests.*", "tests.*", "tests", "testproject"]),
    platforms=['OS Independent'],
    include_package_data=True,
    description='This is a tool for map the old version of Django project models to new version.',
    long_description=README,
    long_description_content_type='text/markdown',
    author='Chatr-e Nili',
    author_email='info@cnili.com',
    url='https://gitlab.com/cnili/django-migdb',
    license='MIT',
    zip_safe=False,
    install_requires=[
        'Django>=2.0',
    ],
    classifiers=[
        'Environment :: Web Environment',
        'Development Status :: 5 - Production/Stable',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT license',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Framework :: Django',
        'Framework :: Django :: 2.0',
        'Framework :: Django :: 2.1',
        'Framework :: Django :: 2.2',
        'Framework :: Django :: 2.3',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
    ],
)
