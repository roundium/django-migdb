from django.core.management.base import BaseCommand
import time
from migdb.dump import get_structure_file_content, generate_dump_file


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        parser.add_argument('app_name', nargs='+', type=str, help='apps')

    def handle(self, *args, **options):
        for app in options['app_name']:
            self.stdout.write(
                self.style.SUCCESS('Start dump data for %s app...' % app)
            )
            file_name = "%s_structure.json" % app
            file_content = get_structure_file_content(file_name)
            generate_dump_file(file_content, app)
