import { Storage } from 'aws-amplify';

export async function s3Upload (file) {
	const { name, type } = file;
	const filename = `${Date.now()}-${name}`;
	const stored = await Storage.vault.put(filename, file, {
		contentType: type
	});
	return stored.key;
}
