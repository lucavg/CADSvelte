<script lang="ts">
	import { supabase } from '$lib/supabase';

	export let url: string | null = null;

	let uploading = false;
	let files: FileList;

	const uploadFile = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExt}`;

			let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

			if (uploadError) {
				console.error('Error uploading file:', uploadError.message);
				throw uploadError;
			}

			const publicURL = supabase.storage.from('avatars').getPublicUrl(filePath);

			if (publicURL == null || publicURL instanceof Error) {
				console.error('Error uploading file: publicUrl not available');
				throw uploadError;
			}

			url = publicURL.data.publicUrl;
		} catch (error: any) {
			console.log(error.message);
		} finally {
			uploading = false;
		}
	};
</script>

<div aria-live="polite">
	<label class="form-control w-full block">
		<!-- <div class="label">
			<label class="label-text text-secondary" for="photoUrl">Kies een foto</label>
		</div> -->
		<input
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadFile}
			disabled={uploading}
			class="file-input file-input-bordered file-input-primary file-input-md mx-auto block bg-white w-full max-w-xl disabled:bg-white disabled:file-input-warning"
		/>
	</label>
</div>
