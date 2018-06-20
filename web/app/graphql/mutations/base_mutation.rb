class Mutations::BaseMutation < GraphQL::Schema::RelayClassicMutation
  def convert_errors(errors)
    errors.map do |attribute, message|
      {
        path: ["attributes", attribute.to_s.camelize(:lower)],
        message: message,
      }
    end
  end
end
