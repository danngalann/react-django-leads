from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead Viewset
# A viewset allows to create a CRUD API without explicitly coding the methods
class LeadViewSet(viewsets.ModelViewSet):
  permission_classes = [
    permissions.IsAuthenticated
  ]

  serializer_class = LeadSerializer

  def get_queryset(self):
    return self.request.user.leads.all()
  
  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)
