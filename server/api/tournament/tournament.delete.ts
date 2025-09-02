import supabase from '../../../config/supabaseClient'

export default defineEventHandler(async event => {
  // Only allow DELETE requests
  assertMethod(event, ['DELETE']);

  const body = await readBody(event);

  // Validate user
  const { error: errorValidate } = TournamentDeleteSchema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });

  // If we get an error, send it back
  if (errorValidate) {
    throw createError({
      statusCode: 200,
      statusMessage: errorValidate.message,
    });
  }

  // Check if tournament exists
  const { data, error } = await supabase.from('Tournament')
    .select()
    .eq('id', body.id)

  if (error) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Toernooi niet gevonden',
    });
  } else {
    // Delete attendee
    const { data: dataDelete, error: errorDelete } = await supabase.from('Tournament')
      .delete()
      .eq('id', body.id)

    if (errorDelete) {
      throw createError({
        statusCode: 200,
        statusMessage: 'Verwijderen van toernooi mislukt',
      });
    } else {
      return dataDelete;
    }
  }
});
