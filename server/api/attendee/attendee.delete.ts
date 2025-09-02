import supabase from '../../../config/supabaseClient'

export default defineEventHandler(async event => {
  // Only allow DELETE requests
  assertMethod(event, ['DELETE']);

  const body = await readBody(event);

  // Validate attendee
  const { error: errorValidate } = AttendeeDeleteSchema.validate(body, {
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

  // Check if attendee exists
  const { data, error } = await supabase.from('attendee')
    .select()
    .eq('id', body.id)

  if (error) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Deelnemers niet gevonden',
    });
  } else {
    // Delete attendee
    const { data: dataDelete, error: errorDelete } = await supabase.from('attendee')
      .delete()
      .eq('id', body.id)

    if (errorDelete) {
      throw createError({
        statusCode: 200,
        statusMessage: 'Verwijderen van deelnemer mislukt',
      });
    } else {
      return dataDelete;
    }
  }
});
