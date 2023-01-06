import os

def get_orphaned_translated_files_by_language(language_code):
    """
    Returns a list of orphaned translated files for the given language
    Translated files are considered "orphaned" when there is no equivalent English source file.
    """
    orphaned_translated_files = []
    content_dir = f'content/{language_code}'

    for root, dir_names, file_names in os.walk(content_dir):
        for file_name in file_names:
            translated_content_path = os.path.join(root, file_name)
            english_content_path = translated_content_path.replace(f'/{language_code}/', '/en/')

            if not os.path.exists(english_content_path):
                orphaned_translated_files.append(translated_content_path)

    return orphaned_translated_files


def get_translation_languages():
    """
    Returns an array of language names based on each language subdirectory under 'content'
    """
    languages = []

    for directory in os.scandir('content'):
        if directory.is_dir() and directory.name != 'en':
            languages.append(directory.name)

    return languages



if __name__ == '__main__':
    print('Searching for orphaned translated files...')
    languages = get_translation_languages()

    for lang in languages:
        orphaned = get_orphaned_translated_files_by_language(lang)

        if len(orphaned) > 0:
            print(f'\nThe following {lang} pages are orphaned and should likely be removed from the repo:')
            print('\n'.join(orphaned))
