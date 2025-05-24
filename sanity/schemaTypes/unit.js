export default {
  name: 'unit',
  title: 'Unit',
  type: 'document',
  fields: [
    {
      name: 'code',
      title: 'Unit Code',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'name',
      title: 'Unit Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'grade',
      title: 'Grade',
      type: 'string'
    },
    {
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Completed', value: 'completed'},
          {title: 'In Progress', value: 'in-progress'},
          {title: 'Upcoming', value: 'upcoming'}
        ]
      },
      validation: Rule => Rule.required()
    }
  ]
}
