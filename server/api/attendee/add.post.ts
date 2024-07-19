import { log } from 'console';
import supabase from '../../../config/supabaseClient'

export default eventHandler(async event => {
  // Only allow POST requests
  assertMethod(event, ['POST']);

  const body = await readBody(event);

  // Validate attendee
  const { error: validationError } = AttendeeSchema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });

  // If we get an error, send it back
  if (validationError) {
    throw createError({
      statusCode: 200,
      statusMessage: validationError.message,
    });
  }

  // Check if attendee exists
  const { data, error } = await supabase.from('attendee')
    .select().eq('firstname', body.firstname)
    .eq('lastname', body.lastname);

  if (error) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Sorry deze deelnemer bestaat al',
    });
  } else {

    console.log(body.firstname, body.lastname, body.rating);
    console.log(body.user_id);


    const { data, error } = await supabase.from('attendee')
      .insert({ user_id: body.user_id, firstname: body.firstname, lastname: body.lastname, rating: body.rating })

    if (error) {
      console.log(error);

      throw createError({
        statusCode: 200,
        statusMessage: 'Sorry er gaat iets mis bij het opslaan van de deelnemer',
      });
    }

    return data;
  }
});

